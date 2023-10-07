import { User } from '@/types/user';
import { useState, useEffect } from 'react'
import { getCookie } from '../cookies';

const useLogged = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getCookie('user');

    if (!user) {
      setIsLoading(false);
      return;
    }

    setUser(JSON.parse(user));
    setIsLoading(false);
  }, []);


  return {
    user,
    isLoading
  }
}

export default useLogged;
