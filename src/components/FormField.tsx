import { FormFieldProps } from '@/types';
import React from 'react';

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      className="mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
      type={type}
      placeholder={placeholder}
      name={name}
      {...register(name, valueAsNumber ? { valueAsNumber } : {})}
    />
    {error && <span className="text-red-500">{error.message}</span>}
  </>
);
export default FormField;
