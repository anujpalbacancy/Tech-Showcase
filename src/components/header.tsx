'use client';
import { logo } from '@/icons/icons';
import Link from 'next/link';
import React from 'react';

const Header = () => {
    const [activeLink, setActiveLink] = React.useState('posts');
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
        // setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex justify-between mx-2 items-center w-full sm:w-auto text-center sm:text-left mx-auto sm:mx-0">
                    <span className=''>
                        <Link className='inline-block' href='/'>
                            {logo}
                        </Link>
                    </span>
                    <div className="sm:hidden flex justify-end">
                        <button onClick={toggleMenu} className="text-white">
                            {isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
                        </button>
                    </div>
                </div>

                <nav className={`flex-grow text-center mt-4 sm:mt-0 ${isMenuOpen ? 'block' : 'hidden'} sm:flex sm:items-center sm:justify-around`}>
                    <ul className="flex flex-col sm:flex-row justify-center sm:space-x-8 ">
                        <li className='m-2 '>
                            <Link
                                href="/posts"
                                className={`hover:bg-white px-2 py-1 rounded    hover:text-black font-bold ${activeLink === 'posts' ? 'bg-white px-2 py-1 rounded text-black font-bold' : ''}`}
                                onClick={() => handleLinkClick('posts')}
                            >
                                Posts
                            </Link>
                        </li>
                        <li className='m-2'>
                            <Link
                                href="/users"
                                className={`hover:bg-white px-2 py-1 rounded   hover:text-black font-bold ${activeLink === 'users' ? 'bg-white px-2 py-1 rounded text-black font-bold' : ''}`}
                                onClick={() => handleLinkClick('users')}
                            >
                                Users
                            </Link>
                        </li>
                        <li className='m-2'>
                            <Link
                                href="/form-validation"
                                className={`hover:bg-white px-2 py-1 rounded  hover:text-black font-bold ${activeLink === 'form-validation' ? 'bg-white px-2 py-1 rounded text-black font-bold' : ''}`}
                                onClick={() => handleLinkClick('form-validation')}
                            >
                                Form
                            </Link>
                        </li>
                        <li className='m-2'>
                            <Link
                                href="/users-table"
                                className={`hover:bg-white px-2 py-1 rounded  hover:text-black font-bold ${activeLink === 'users-table' ? 'bg-white px-2 py-1 rounded text-black font-bold' : ''}`}
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
