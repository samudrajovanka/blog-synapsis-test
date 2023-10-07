import { getCookie } from '@/lib/cookies';

import { ACCESS_TOKEN_KEY } from './constants/storageKey';

export type Query = Record<string, string | number | string[] | number[]>;

const generateQuery = (query: Query) => {
  const queryKeys = Object.keys(query);
  if (queryKeys.length === 0) return '';

  const queryValues = queryKeys.map((key) => {
    if (!query[key]) return null;

    if (Array.isArray(query[key])) {
      const arrayValueQuery: string[] = query[key];
      if (arrayValueQuery.length === 0) return null;

      return arrayValueQuery.map((value) => `${key}=${value}`).join('&');
    }

    return `${key}=${query[key]}`;
  });

  const queryString = queryValues.filter((query) => query !== null).join('&');

  return queryString;
};

export const parseURL = (url: string, query?: Query) => {
  const [urlWithoutQueries, initialQueries] = url.split('?');

  const listOfQueries: string[] = [];
  if (initialQueries) listOfQueries.push(initialQueries);
  if (query) listOfQueries.push(generateQuery(query));

  const queryString = listOfQueries.length > 0 ? `?${listOfQueries.join('&')}` : '';
  return `${urlWithoutQueries}${queryString}`;
};

type FetcherOptions = {
  url: string;
  query?: Query;
} & RequestInit;

type Fetcher = <SuccessResponse>(options: FetcherOptions) => Promise<{ response: Response, data: SuccessResponse }>;

const fetcher: Fetcher = ({ method = 'GET', ...args }) => {
  const accessToken = process.env.NEXT_PUBLIC_GOREST_ACCESS_TOKEN;

  const callbackPromise = async (resolve, reject) => {
    const finalUrl = `${process.env.NEXT_PUBLIC_GOREST_API_URL}${args.url}`;

    const response = await fetch(parseURL(finalUrl, args?.query), {
      method,
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        ...(!args?.options?.isFormData && { 'Content-Type': 'application/json' }),
        ...args?.headers
      },
      cache: args?.cache ?? args?.next ? undefined : 'no-store',
      ...args
    });

    const data = await response.json();

    if (!response.ok) {
      reject(data);
    }

    const result = data as SuccessResponse;

    resolve({
      response: {
        headers: response.headers,
      },
      data: result
    });
  };

  return new Promise(callbackPromise);
};

export default fetcher;
