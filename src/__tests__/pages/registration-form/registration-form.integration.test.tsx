import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationForm from '@/app/form-validation/page';
import { FormFieldProps } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SelectedLinkProvider } from '@/context/ActiveLinkContext';

const mockSetSelectedLink = jest.fn();
const mockPush = jest.fn();
jest.mock('../../../components/FormField', () => ({
  __esModule: true,
  default: ({ type, placeholder, name, register, error }: FormFieldProps) => (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        aria-label={name}
      />
      {error && <p>{error.message}</p>}
    </div>
  ),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('../../../context/ActiveLinkContext', () => ({
  ...jest.requireActual('../../../context/ActiveLinkContext'),
  useSelectedLink: jest.fn(() => ({
    selectedLink: 'home',
    setSelectedLink: mockSetSelectedLink,
  })),
}));

describe('RegistrationForm', () => {
  it('renders the form correctly', () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Enter your password'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Confirm your password'),
    ).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<RegistrationForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const confirmPasswordInput = screen.getByPlaceholderText(
      /confirm your password/i,
    );
    const submitButton = screen.getByText(/submit/i);

    await act(async () => {
      await userEvent.type(nameInput, 'John Doe');
      await userEvent.type(emailInput, 'john.doe@example.com');
      await userEvent.type(passwordInput, 'Anujpal160180107030@');
      await userEvent.type(confirmPasswordInput, 'Anujpal160180107030@');
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(consoleLogSpy).toHaveBeenCalledWith('Form Submitted:', {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Anujpal160180107030@',
      confirmPassword: 'Anujpal160180107030@',
    });

    consoleLogSpy.mockRestore();
  });

  it('When passing an weak password the form should not submit', async () => {
    render(<RegistrationForm />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const confirmPasswordInput = screen.getByPlaceholderText(
      /confirm your password/i,
    );
    const submitButton = screen.getByText(/submit/i);
    await act(async () => {
      await userEvent.type(nameInput, 'John Doe');
      await userEvent.type(emailInput, 'john.doe@example.com');
      await userEvent.type(passwordInput, 'Anujpal160180');
      await userEvent.type(confirmPasswordInput, 'Anujpal160180');
    });
    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(
      screen.getByText(
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      ),
    ).toBeInTheDocument();
  });

  it('When Password does not matched', async () => {
    render(<RegistrationForm />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const confirmPasswordInput = screen.getByPlaceholderText(
      /confirm your password/i,
    );
    const submitButton = screen.getByText(/submit/i);
    await act(async () => {
      await userEvent.type(nameInput, 'John Doe');
      await userEvent.type(emailInput, 'john.doe@example.com');
      await userEvent.type(passwordInput, 'Anujpal160180107030@');
      await userEvent.type(confirmPasswordInput, 'Anujpal160180107030');
    });
    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('resets the form when clear button is clicked', async () => {
    render(<RegistrationForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Confirm your password',
    );
    const clearButton = screen.getByText(/clear/i);
    await act(async () => {
      await userEvent.type(nameInput, 'John Doe');
      await userEvent.type(emailInput, 'john.doe@example.com');
      await userEvent.type(passwordInput, 'Anujpal160180107030@');
      await userEvent.type(confirmPasswordInput, 'Anujpal160180107030@');
    });

    await act(async () => {
      fireEvent.click(clearButton);
    });

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');
  });

  it('shows error messages for invalid data', async () => {
    render(<RegistrationForm />);

    const submitButton = screen.getByText(/submit/i);

    fireEvent.click(submitButton);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Invalid email address/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Password is too short/i),
    ).toBeInTheDocument();
  });

  it('triggers onClick method of BackButton', () => {
    const renderWithClient = (ui: React.ReactElement) => {
      const queryClient = new QueryClient();
      return render(
        <QueryClientProvider client={queryClient}>
          <SelectedLinkProvider>{ui}</SelectedLinkProvider>
        </QueryClientProvider>,
      );
    };
    renderWithClient(<RegistrationForm />);
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);

    expect(mockSetSelectedLink).toHaveBeenCalledWith('home');
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
