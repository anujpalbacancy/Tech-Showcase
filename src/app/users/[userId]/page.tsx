// app/users/[userId]/page.js
'use client'; // Ensure this component is client-side only

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

const getUserById = async (userId: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  const data = await res.json()
  return data
}

const UserProfile = () => {
  const { userId } = useParams()
  const router = useRouter()
  const { isLoading, error, data } = useQuery({
    queryKey: ['userById', userId],
    queryFn: () => getUserById(Number(userId)),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!data) return <div>User not found</div>;

  const { name, username, email, phone, website, address, company } = data
  console.log({ name, username, email, phone, website, address, company });


  return (
    <>
      <span className='cursor-pointer' onClick={() => router.push('/users')}><i className="fa-sharp text-4xl mt-8 ms-32 fa-solid fa-arrow-left-long"></i></span>
      <div className='flex  justify-center mt-2 mb-8 rounded-lg text-black'>
        <div style={{ height: '88vh', width: '60vh' }} className='w-md bg-white shadow-lg'>
          <div className='flex justify-center mt-5'>
            <div style={{ height: '120px', width: '120px' }} className="relative inline-flex text-3xl items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">{name.split(" ")?.map((str: string) => str.at(0)?.toLocaleUpperCase())?.join("")}</span>
            </div>

          </div>
          <div className='text-3xl text-black text-center mt-4 font-bold'>
            {name}
          </div>

          <div className=' text-black text-center mt-3'>
            @{username}
          </div>
          <div>


          </div>
          <hr className='mt-3' />
          <div className='text-xl font-bold text-black text-center mt-4 '>
            Address
          </div>
          <div className='m-3 p-2'>
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

          <hr className='mt-3' />
          <div className='text-xl font-bold text-black text-center mt-4 '>
            Geolocation
          </div>

          <div className='m-2 p-2'>

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
