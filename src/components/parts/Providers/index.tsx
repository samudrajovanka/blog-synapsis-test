'use client';

import React, { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dynamic from 'next/dynamic';

import { queryClientConfig } from '@/lib/queryClient';

const ReactQueryDevtoolsProduction = dynamic(() =>
  import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools)
);

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [showDevtools, setShowDevtools] = useState(false);
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  useEffect(() => {
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
};

export default Providers;
