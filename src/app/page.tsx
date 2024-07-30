import Link from 'next/link';
import React from 'react';

const homePageCards = [
  {
    name: 'Users Page',
    description: 'This is a page where all the users are listed in cards',
    href: '/users',
  },
  {
    name: 'Users Table Page',
    description: 'This is a page where all the users are listed in table',
    href: '/users-table',
  },
  {
    name: 'Posts Page',
    description: 'This is a page where all the posts are listed in table',
    href: '/posts',
  },
  {
    name: 'Form Validation Page',
    description:
      'This is a page We have performed form validation using react hook form and zod',
    href: '/form-validation',
  },
];
export default function Home() {
  return (
    <div className="mt-8 grid grid-cols-1 font-bold underline sm:grid-cols-2 lg:grid-cols-3">
      {homePageCards.map((card) => {
        return (
          <Link
            key={card.name}
            href={card.href}
            className="mx-2 mt-4 block h-36 max-w-sm rounded-lg bg-white p-6 text-black no-underline shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <h1 className="text-center">{card.name}</h1>
            <p className="mt-3 font-normal italic">{card.description}</p>
          </Link>
        );
      })}
    </div>
  );
}
