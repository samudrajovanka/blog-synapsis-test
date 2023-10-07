import fetcher from '@/lib/fetcher';
import { PageFilter } from './posts';

export const createUser = async (user: User) => {
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

export const getUsers = async (filters: GetUserFilters) => {
  const response = await fetcher({
    url: '/users',
    query: filters
  });

  return response;
};

export const getUser = async (id: number) => {
  const response = await fetcher({
    url: `/users/${id}`,
  });

  return response;
};
