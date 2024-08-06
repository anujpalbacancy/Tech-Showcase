'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import BackButton from '@/components/BackButton';

const getUserById = async (userId: number) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  const data = await res.json();
  return data;
};

const UserProfile = () => {
  const { userId } = useParams();
  const router = useRouter();
  const { isLoading, error, data } = useQuery({
    queryKey: ['userById', userId],
    queryFn: () => getUserById(Number(userId)),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!data) return <div>User not found</div>;

  const { name, username, address } = data;

  return (
    <>
      <BackButton
        onClick={() => router.push('/users')}
        iconClass="fa-sharp fa-solid fa-arrow-left-long"
        additionalClasses="ms-32 mt-8 text-4xl"
      />
      <div className="mb-8 mt-2 flex justify-center rounded-lg text-black">
        <div
          style={{ height: '88vh', width: '60vh' }}
          className="w-md bg-white shadow-lg"
        >
          <div className="mt-5 flex justify-center">
            <div
              style={{ height: '120px', width: '120px' }}
              className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-3xl dark:bg-gray-600"
            >
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {name
                  .split(' ')
                  ?.map((str: string) => str.at(0)?.toLocaleUpperCase())
                  ?.join('')}
              </span>
            </div>
          </div>
          <div className="mt-4 text-center text-3xl font-bold text-black">
            {name}
          </div>

          <div className="mt-3 text-center text-black">@{username}</div>
          <div></div>
          <hr className="mt-3" />
          <div className="mt-4 text-center text-xl font-bold text-black">
            Address
          </div>
          <div className="m-3 p-2">
            <div>
              <span>Street : </span>
              <span>{address.street}</span>
            </div>
            <div>
              <span>Suite : </span>
              <span>{address?.suite}</span>
            </div>
            <div>
              <span>City : </span>
              <span>{address?.city}</span>
            </div>

            <div>
              <span>zipcode : </span>
              <span>{address?.zipcode}</span>
            </div>
          </div>

          <hr className="mt-3" />
          <div className="mt-4 text-center text-xl font-bold text-black">
            Geolocation
          </div>

          <div className="m-2 p-2">
            <div>
              <span>lat : </span>
              <span>{address?.geo?.lat}</span>
            </div>

            <div>
              <span>lng : </span>
              <span>{address?.geo?.lng}</span>
            </div>
          </div>

          {/* <hr className='mt-3' />
        <div className='text-xl text-black text-center mt-4 '>
          Company
        </div>
        <div className='m-3 p-2'>
          <div>
            <span>Name : </span>
            <span>Romaguera-Jacobson</span>
          </div>
          <div>
            <span>Catch Phrase : </span>
            <span>Face to face bifurcated interface</span>
          </div>
   
        </div> */}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
