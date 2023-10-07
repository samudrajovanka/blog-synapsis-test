import fetcher from '@/lib/fetcher';
import { Comment, Post } from '@/types/post';
import { User } from '@/types/user';

export type PageFilter = {
  page?: number;
};

export type PostsFilters = PageFilter & {
  user_id?: number;
};

export const getPosts = async (filters?: PostsFilters) => {
  const response = await fetcher<Post[]>({
    url: '/posts',
    query: filters
  });

  return response;
};

export const getPost = async (id: number) => {
  const response = await fetcher<Post>({
    url: `/posts/${id}`
  });

  return response;
};

export type PostCommentsFilters = PageFilter;

export const getPostComments = async (id: number, filters?: PostCommentsFilters) => {
  const response = await fetcher<Comment[]>({
    url: `/posts/${id}/comments`,
    query: filters
  });

  return response;
};

export const addComment = async (data: {
  postId: number,
  body: string,
  user: Pick<User, 'name' | 'email'>
}) => {
  const response = await fetcher<Comment>({
    url: `/posts/${data.postId}/comments`,
    method: 'POST',
    body: JSON.stringify({
      name: data.user.name,
      email: data.user.email,
      body: data.body
    })
  });

  return response;
};

export const createBlog = async (userId: number, data: {
  title: string,
  body: string
}) => {
  const response = await fetcher<Post>({
    url: `/users/${userId}/posts`,
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      body: data.body,
    })
  });

  return response;
}
