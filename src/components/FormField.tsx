import { FormFieldProps } from "@/types";
import React from "react";

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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none "
            type={type}
            placeholder={placeholder}
            name={name}
            {...register(name, valueAsNumber ? { valueAsNumber } : {})}
        />
        {error && <span className="text-red-500">{error.message}</span>}
    </>
);
export default FormField;
