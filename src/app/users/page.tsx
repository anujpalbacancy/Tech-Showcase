import React from 'react';
import { User } from '@/types';
import UsersCard from './page.client';

const getUsers = async (): Promise<User[]> => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users?limit=10',
  );
  return response.json();
};

const Users = async () => {
  const data = await getUsers();

  return (
    <>
      <UsersCard users={data} />
    </>
  );
};

export default Users;
