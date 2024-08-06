'use client';
import { useSelectedLink } from '@/context/ActiveLinkContext';
import { LogoIcon } from '@/icons/icons';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { selectedLink, setSelectedLink } = useSelectedLink();

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mx-auto flex w-full items-center justify-between text-center sm:mx-0 sm:w-auto sm:text-left">
          <span className="" onClick={() => setSelectedLink('home')}>
            <Link className="inline-block" href="/">
              <LogoIcon />
            </Link>
          </span>
          <div className="flex justify-end sm:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? (
                <i className="fa-solid fa-xmark"></i>
              ) : (
                <i className="fa-solid fa-bars"></i>
              )}
            </button>
          </div>
        </div>

        <nav
          className={`mt-4 flex-grow text-center sm:mt-0 ${isMenuOpen ? 'block' : 'hidden'} sm:flex sm:items-center sm:justify-around`}
        >
          <ul className="flex flex-col justify-center sm:flex-row sm:space-x-8">
            <li className="m-2">
              <Link
                href="/"
                className={`rounded px-2 py-1 font-bold hover:bg-white hover:text-black ${selectedLink === 'home' ? 'rounded bg-white px-2 py-1 font-bold text-black' : ''}`}
                onClick={() => handleLinkClick('home')}
              >
                Home
              </Link>
            </li>
            <li className="m-2">
              <Link
                href="/posts"
                className={`rounded px-2 py-1 font-bold hover:bg-white hover:text-black ${selectedLink === 'posts' ? 'rounded bg-white px-2 py-1 font-bold text-black' : ''}`}
                onClick={() => handleLinkClick('posts')}
              >
                Posts
              </Link>
            </li>
            <li className="m-2">
              <Link
                href="/users"
                className={`rounded px-2 py-1 font-bold hover:bg-white hover:text-black ${selectedLink === 'users' ? 'rounded bg-white px-2 py-1 font-bold text-black' : ''}`}
                onClick={() => handleLinkClick('users')}
              >
                Users
              </Link>
            </li>
            <li className="m-2">
              <Link
                href="/form-validation"
                className={`rounded px-2 py-1 font-bold hover:bg-white hover:text-black ${selectedLink === 'form-validation' ? 'rounded bg-white px-2 py-1 font-bold text-black' : ''}`}
                onClick={() => handleLinkClick('form-validation')}
              >
                Form
              </Link>
            </li>
            <li className="m-2">
              <Link
                href="/users-table"
                className={`rounded px-2 py-1 font-bold hover:bg-white hover:text-black ${selectedLink === 'users-table' ? 'rounded bg-white px-2 py-1 font-bold text-black' : ''}`}
                onClick={() => handleLinkClick('users-table')}
              >
                Users Table
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
