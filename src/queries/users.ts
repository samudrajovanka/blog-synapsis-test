import { getUser, GetUserFilters, getUsers } from '@/repositories/users';
import { User } from '@/types/user';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

export const getUsersKey = (options?: {
  filters?: GetUserFilters
}) => ['users', options?.filters];

export const useUsers = (options?: {
  filters?: GetUserFilters
  queryOptions?: UseQueryOptions<{ response: {
    headers: Headers;
  }, data: User[] }>,
}) => useQuery({
  queryKey: getUsersKey(options),
  queryFn: () => getUsers(options?.filters),
  keepPreviousData: true,
  ...options?.queryOptions,
});

export const getUserKey = (id: number) => ['user', id];

export const useUser = (id: number, options?: {
  queryOptions?: UseQueryOptions<{ response: {
    headers: Headers;
  }, data: User }>,
}) => useQuery({
  queryKey: getUserKey(id),
  queryFn: () => getUser(id),
  ...options?.queryOptions,
});
