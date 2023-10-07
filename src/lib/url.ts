import { Query } from './fetcher';

export const combineSearchParams = (searchParams: string | URLSearchParams, newParams: Query) => {
  const params = new URLSearchParams(searchParams);
  Object.keys(newParams).forEach((key) => {
    params.append(key, newParams[key]);
  });

  return params;
};

export const removeSearchParams = (searchParams: string | URLSearchParams, paramsToRemove: string[]) => {
  const params = new URLSearchParams(searchParams);
  paramsToRemove.forEach((key) => {
    params.delete(key);
  });

  return params;
};
