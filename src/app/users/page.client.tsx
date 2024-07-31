'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import UserCard from '@/components/UserCard';

const UserCardWrapper = ({ user }: { user: User }) => {
  const router = useRouter();

  const redirectToProfilePage = () => {
    router.push(`/users/${user.id}`);
  };

  return <UserCard onClick={redirectToProfilePage} user={user} />;
};

export default UserCardWrapper;
