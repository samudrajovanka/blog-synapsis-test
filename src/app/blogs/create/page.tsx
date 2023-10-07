import CreateBlog from '@/components/pages/CreateBlog';
import { getCookie } from '@/lib/cookies'
import { redirect } from 'next/navigation';

const CreateBlogPage = () => {
  const user = getCookie('user');

  if (!user) {
    redirect('/login');
  }

  return <CreateBlog />
}

export default CreateBlogPage