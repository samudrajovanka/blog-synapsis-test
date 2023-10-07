/* eslint-disable global-require */
import { getCookie as getCookieNext, setCookie } from 'cookies-next';

export const getNextCookieStore = () => {
  const { cookies } = require('next/headers');

  return cookies();
};

export const getCookie = (name: string): string | undefined => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const cookiesStore = getNextCookieStore();

    return cookiesStore.get(name)?.value;
  }

  return getCookieNext(name);
};