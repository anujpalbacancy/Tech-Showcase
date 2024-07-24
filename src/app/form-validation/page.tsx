'use client';
import FormField from '@/components/FormField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from '@/schema/UserSchema';
import { FormData } from '@/types';



const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(UserSchema),
  });


  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Form Submitted:', data);
    reset(); 
  };

  const handleClear = () => {
    reset();
  };

  return (
    <form className="w-full max-w-sm mx-auto mt-24 p-10 rounded-md bg-slate-50" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <FormField
          type="text"
          placeholder="Enter your name"
          name="name"
          register={register}
          error={errors.name}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <FormField
          type="email"
          placeholder="Enter your email address"
          name="email"
          register={register}
          error={errors.email}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <FormField
          type="password"
          placeholder="Enter your password"
          name="password"
          register={register}
          error={errors.password}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <FormField
          type="password"
          placeholder="Confirm your password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
