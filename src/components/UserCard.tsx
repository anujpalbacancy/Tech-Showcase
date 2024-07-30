import { User } from '@/types';
import React from 'react';

interface UserCardProps {
  user: User;
  /* eslint-disable-next-line no-unused-vars */
  onClick: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div key={user.id} onClick={() => onClick(user)}>
      <a
        href="#"
        className="mx-2 mt-4 block h-56 max-w-sm rounded-lg bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {user?.name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {user?.website}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {user?.company?.catchPhrase}
        </p>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          {user?.email}
        </p>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          {user?.phone}
        </p>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          {user?.username}
        </p>
      </a>
    </div>
  );
};

export default UserCard;
