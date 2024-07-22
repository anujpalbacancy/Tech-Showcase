import { User } from '@/types';
import React from 'react';

const UserCard = (props: { user: User , onClick: (user: User) => void}) => {
  return (
    <div key={props.user.id} onClick={() => props.onClick(props.user)}>
      <a
        href="#"
        className="mt-4 block max-w-sm rounded-lg bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.user.name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.user.website}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.user.company.catchPhrase}
        </p>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.user.email}
        </p>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.user.phone}
        </p>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.user.username}
        </p>
      </a>
    </div>
  );
};

export default UserCard;
