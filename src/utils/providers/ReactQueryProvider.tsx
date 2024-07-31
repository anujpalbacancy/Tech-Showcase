'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  // default cacheTime : 5min and staleTime:0
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
