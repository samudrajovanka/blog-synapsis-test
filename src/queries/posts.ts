import { PostCommentsFilters, PostsFilters, getPost, getPostComments, getPosts } from '@/repositories/posts';
import { Post } from '@/types/post';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

export const getPostsKey = (options: { filters?: PostsFilters }) => ['posts', options?.filters];

export const usePosts = (options: {
  filters?: PostsFilters,
  queryOptions?: UseQueryOptions<{ response: Response, data: Post[] }> 
}) => useQuery({
  queryKey: getPostsKey(options),
  queryFn: () => getPosts(options?.filters),
  keepPreviousData: true,
  ...options?.queryOptions,
});

export const getPostKey = (id: number) => ['post', id];

export const usePost = (id: number) => useQuery({
  queryKey: getPostKey(id),
  queryFn: () => getPost(id),
});

export const getPostCommentsKey = (id: number, options: {
  filters?: PostCommentsFilters
}) => ['post-comments', id, options?.filters];

export const usePostComments = (id: number, options: {
  filters?: PostCommentsFilters
}) => useQuery({
  queryKey: getPostCommentsKey(id, options),
  queryFn: () => getPostComments(id, options?.filters),
});
