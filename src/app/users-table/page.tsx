'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types';
import Table from '@/components/Table';
import { useRouter } from 'next/navigation';
import { useSelectedLink } from '@/context/ActiveLinkContext';
import BackButton from '@/components/BackButton';

const getUsers = async (): Promise<User[] | []> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
};

const UsersTable = () => {
  const router = useRouter();
  const { setSelectedLink } = useSelectedLink();

  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const columns = [
    {
      accessorKey: 'id',
      header: '#',
      size: 100,
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 150,
    },
    {
      accessorKey: 'username',
      header: 'User Name',
      size: 150,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 250,
    },
    {
      header: 'Address',
      columns: [
        {
          accessorKey: 'address.street',
          header: 'Street',
          size: 150,
        },
        {
          accessorKey: 'address.suite',
          header: 'Suite',
          size: 100,
        },
        {
          accessorKey: 'address.city',
          header: 'City',
          size: 150,
        },
      ],
    },
  ];

  if (isLoading) return <div>Loading users...</div>;

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
        Users Table
      </div>
      <Table columns={columns} data={data || []} />
    </>
  );
};

export default UsersTable;
