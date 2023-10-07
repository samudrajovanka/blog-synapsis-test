import { getCookie } from '@/lib/cookies';

export type Query = Record<string, string | number>;

const generateQuery = (query: Query) => {
  const queryKeys = Object.keys(query);
  if (queryKeys.length === 0) return '';

  const queryValues = queryKeys.map((key) => {
    if (!query[key]) return null;

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
  options?: {
    isFormData?: boolean;
  }
} & RequestInit;

type Fetcher = <SuccessResponse>(options: FetcherOptions) => Promise<{ response: {
  headers: Headers;
}, data: SuccessResponse }>;

const fetcher = <SuccessResponse>({ method = 'GET', ...args }: FetcherOptions) => {
  const accessToken = process.env.NEXT_PUBLIC_GOREST_ACCESS_TOKEN;

  return new Promise<{ response: {
    headers: Headers;
  }, data: SuccessResponse }>(async (resolve, reject) => {
    const finalUrl = `${process.env.NEXT_PUBLIC_GOREST_API_URL}${args.url}`;

    const response = await fetch(parseURL(finalUrl, args?.query), {
      method,
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        ...(!args?.options?.isFormData && { 'Content-Type': 'application/json' }),
        ...args?.headers
      } as HeadersInit,
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
  });
};

export default fetcher;
