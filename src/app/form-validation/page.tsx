'use client';
import FormField from '@/components/FormField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from '@/schema/UserSchema';
import { Errors, FormData } from '@/types';
import { useRouter } from 'next/navigation';
import { useSelectedLink } from '@/context/ActiveLinkContext';
import BackButton from '@/components/BackButton';

const RegistrationForm = () => {
  const router = useRouter();
  const { setSelectedLink } = useSelectedLink();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Submitted:', data);
    reset();
  };

  const handleClear = () => {
    reset();
  };

  return (
    <>
      <BackButton
        onClick={() => {
          setSelectedLink('home');
          router.push('/');
        }}
        iconClass="fa-sharp fa-solid fa-arrow-left-long"
        additionalClasses="ms-32 mt-8 text-4xl"
      />
      <form
        className="mx-auto mt-24 w-full max-w-sm rounded-md bg-slate-50 p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <FormField
            type="text"
            placeholder="Enter your name"
            name="name"
            register={register}
            error={(errors?.name as Errors['name']) || null}
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <FormField
            type="email"
            placeholder="Enter your email address"
            name="email"
            register={register}
            error={(errors.email as Errors['email']) || null}
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <FormField
            type="password"
            placeholder="Enter your password"
            name="password"
            register={register}
            error={(errors.password as Errors['password']) || null}
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <FormField
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            register={register}
            error={
              (errors.confirmPassword as Errors['confirmPassword']) || null
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
          <button
            type="button"
            className="focus:shadow-outline rounded bg-gray-400 px-4 py-2 font-bold text-white hover:bg-gray-500 focus:outline-none"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
