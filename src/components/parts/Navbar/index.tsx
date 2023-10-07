'use client';

import { useCallback, useMemo, useState } from 'react';

import cx from 'classnames';
import Link from 'next/link';

import Container from '@/components/elements/Container';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/elements/Button';
import { getCookie } from '@/lib/cookies';
import { User } from '@/types/user';
import { deleteCookie } from 'cookies-next';

const MENU = [
  {
    name: 'Blogs',
    path: '/'
  },
  {
    name: 'Search Users',
    path: '/search-users'
  }
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [userLogged, setUserLogged] = useState((() => {
    const user = getCookie('user');

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  })());

  const isActive = useCallback((path: string) => {
    return pathname === path;
  }, [pathname]);

  const handleLogout = useCallback(() => {
    deleteCookie('user');
    setUserLogged(null);

    router.replace('/');
    router.refresh();
  }, [router]);

  return (
    <nav className="bg-neutral py-5">
      <Container className="flex justify-between items-center">
        <ul className="flex items-center gap-5">
          {MENU.map((item) => (
            <li key={item.path} className={cx('hover:text-white', {
              'text-white': isActive(item.path)
            })}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {userLogged ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              {userLogged.name}
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><Link href="/blogs/my">My Blog</Link></li>
              <li><Link href="/blogs/create">Create Blog</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button href="/register" className="btn-ghost">Register</Button>
            <Button href="/login">Login</Button>
          </div>
        )}

      </Container>
    </nav>
  )
}

export default Navbar;
