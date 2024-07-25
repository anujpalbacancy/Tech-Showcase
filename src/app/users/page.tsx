'use client';
import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import { User } from '@/types';
import UserCard from '@/components/UserCard';
import { useRouter } from 'next/navigation';

const getUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users?limit=10');
  return response.json();
};

const Users = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const router = useRouter()

  const redirectToProfilePage = (user: User) => {
    router.push(`/users/${user.id}`);
  }

  console.log({ isLoading, error, data });
  

  if (isLoading ) return <div>Loading users...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h3 className="mb-2 mt-5 text-center text-4xl font-extrabold">Users</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((user: User) => <UserCard onClick={redirectToProfilePage} key={user.id} user={user} />)}
      </div>
    </>
  );
};

export default Users;
