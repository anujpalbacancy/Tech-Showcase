import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from '@/components/header';
import ReactQueryProvider from '../utils/providers/ReactQueryProvider';
import './globals.css';
import React from 'react';
import Script from 'next/script';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://kit.fontawesome.com/a95ba240bf.js"></Script>
      </head>
      <body>
        <ReactQueryProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Header />
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
