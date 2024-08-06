import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from '@/app/form-validation/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SelectedLinkProvider } from '@/context/ActiveLinkContext';

const mockSetSelectedLink = jest.fn();
const mockPush = jest.fn();
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
  it('renders the form with input fields and submit button', () => {
    render(<RegistrationForm />);

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your email address'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your password'),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('displays required error when values are invalid', async () => {
    render(<RegistrationForm />);

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(
      await screen.findByText('Invalid email address'),
    ).toBeInTheDocument();
  });

  it('displays pattern error when email is invalid', async () => {
    render(<RegistrationForm />);

    fireEvent.input(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText('Invalid email address'),
    ).toBeInTheDocument();
  });

  it('submits form when values are valid', async () => {
    render(<RegistrationForm />);

    fireEvent.input(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'testuser' },
    });
    fireEvent.input(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(screen.queryByText('name is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Entered value does not match email format'),
    ).not.toBeInTheDocument();
  });

  it('When clicked on clear button, the form should be cleared', async () => {
    render(<RegistrationForm />);
    fireEvent.input(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'testuser' },
    });
    fireEvent.input(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    const name = screen.getByPlaceholderText(
      'Enter your name',
    ) as HTMLInputElement;
    const email = screen.getByPlaceholderText(
      'Enter your email address',
    ) as HTMLInputElement;
    expect(name.value).toBe('');
    expect(email.value).toBe('');
  });

  it('When submit button is clicked, form fields should be cleared', async () => {
    render(<RegistrationForm />);

    fireEvent.input(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'testuser' },
    });
    fireEvent.input(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'Anujpal160180107030@' },
    });
    fireEvent.input(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'Anujpal160180107030@' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText(
        'Enter your name',
      ) as HTMLInputElement;
      const emailInput = screen.getByPlaceholderText(
        'Enter your email address',
      ) as HTMLInputElement;

      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
    });
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
