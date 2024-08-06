import React from 'react'; // Ensure React is imported
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormField from '@/components/FormField';
import { useForm } from 'react-hook-form';
import { FormFieldProps } from '@/types';

// Wrapper component to use the useForm hook
const FormFieldWrapper: React.FC<{
  props?: Omit<FormFieldProps, 'register'>;
}> = ({ props }) => {
  const { register } = useForm();
  if (props) {
    return <FormField register={register} {...props} />;
  }
};

describe('FormField', () => {
  it('renders the input field with correct attributes', () => {
    render(
      <FormFieldWrapper
        props={{
          type: 'text',
          placeholder: 'Enter text',
          name: 'testField',
          error: null,
        }}
      />,
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'testField');
  });

  it('displays the error message when error is provided', () => {
    const error = { message: 'This field is required' };
    render(
      <FormFieldWrapper
        props={{
          type: 'text',
          placeholder: 'Enter text',
          name: 'testField',
          error,
        }}
      />,
    );

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-500');
  });

  it("When valueAsNumber is provided, the input type is set to 'number'", () => {
    render(
      <FormFieldWrapper
        props={{
          type: 'number',
          placeholder: 'Enter text',
          name: 'testField',
          error: null,
          valueAsNumber: true,
        }}
      />,
    );
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('type', 'number');
  });
});
