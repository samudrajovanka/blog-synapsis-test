import { dehydrate, Hydrate } from '@tanstack/react-query';

import Blogs from '@/components/pages/Blogs';
import { getQueryClient } from '@/lib/queryClient';
import { getPostsKey } from '@/queries/posts';
import { getPosts } from '@/repositories/posts';
import { SearchParams } from '@/types/page';
import { isNumberString } from '@/lib/common';
import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';
import { User } from '@/types/user';
import MyBlogs from '@/components/pages/MyBlogs';

const MyBlogsPage = () => <MyBlogs />

export default MyBlogsPage;
