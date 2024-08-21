'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/types';
import Table from '@/components/Table';
import { useSelectedLink } from '@/context/ActiveLinkContext';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';

const getUsers = async (): Promise<Post[] | []> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
};

const PostsTable = () => {
  const router = useRouter();
  const { setSelectedLink } = useSelectedLink();
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: getUsers,
  });

  console.log({ isLoading, error, data });

  const columns = [
    {
      accessorKey: 'id',
      header: '#',
      size: 100,
      enableSorting: true,
    },
    {
      accessorKey: 'userId',
      header: 'User ID',
      size: 100,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      size: 300,
    },
    {
      accessorKey: 'body',
      header: 'Body',
      size: 400,
    },
  ];

  if (isLoading) return <div>Loading Posts...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <BackButton
        onClick={() => {
          setSelectedLink('home');
          router.push('/');
        }}
        iconClass="fa-sharp fa-solid fa-arrow-left-long"
        additionalClasses="ms-32 mt-8 text-4xl"
      />
      <div className="mt-10 text-center text-3xl font-extrabold">
        Posts Table
      </div>
      <Table columns={columns} data={data || []} />
    </>
  );
};

export default PostsTable;
