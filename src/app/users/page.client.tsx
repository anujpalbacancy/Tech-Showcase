'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import UserCard from '@/components/UserCard';
import { useSelectedLink } from '@/context/ActiveLinkContext';
import BackButton from '@/components/BackButton';

const UsersCard = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const { setSelectedLink } = useSelectedLink();

  const redirectToProfilePage = (user: User) => {
    setSelectedLink('users');
    router.push(`/users/${user.id}`);
  };

  return (
    <>
      <BackButton
        onClick={() => {
          setSelectedLink('home');
          router.push('/');
        }}
        iconClass="fa-sharp fa-solid fa-arrow-left-long"
        additionalClasses="ms-32 mt-16 text-4xl"
      />
      <h3 className="mb-2 mt-5 text-center text-4xl font-extrabold">Users</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users?.map((user: User) => (
          <UserCard
            key={user.id}
            onClick={() => redirectToProfilePage(user)}
            user={user}
          />
        ))}
      </div>{' '}
    </>
  );
};

export default UsersCard;
