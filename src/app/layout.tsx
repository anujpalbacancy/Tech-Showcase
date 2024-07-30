import React from 'react';
import ReactQueryProvider from '../utils/providers/ReactQueryProvider';
import './globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


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
        <script src="https://kit.fontawesome.com/a95ba240bf.js" ></script>
      </head>
      <body>
        <ReactQueryProvider>
        <ReactQueryDevtools initialIsOpen={false} />

          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
