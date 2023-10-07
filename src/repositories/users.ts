import fetcher from '@/lib/fetcher';
import { PageFilter } from './posts';
import { User } from '@/types/user';

export const createUser = async (user: Omit<User, 'id'>) => {
  const response = await fetcher({
    url: '/users',
    method: 'POST',
    body: JSON.stringify(user),
  });

  return response;
};

export type GetUserFilters = PageFilter & {
  name?: string;
  email?: string;
};

export const getUsers = async (filters?: GetUserFilters) => {
  const response = await fetcher<User[]>({
    url: '/users',
    query: filters
  });

  return response;
};

export const getUser = async (id: number) => {
  const response = await fetcher<User>({
    url: `/users/${id}`,
  });

  return response;
};
