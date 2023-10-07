import { cache } from 'react';

import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME
    },
    mutations: {
      onError: (error) => {
        toast.error(error.message);
      }
    }
  }
};

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
