import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import RegistrationForm from '@/app/form-validation/page';

describe('RegistrationForm', () => {
    it('renders the form with input fields and submit button', () => {
        render(<RegistrationForm />);

        expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter your email address")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument(); // Optional for username with placeholder

        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('displays required error when values are invalid', async () => {
        render(<RegistrationForm />);

        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText('Name is required')).toBeInTheDocument();
        expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
    });

    it('displays pattern error when email is invalid', async () => {
        render(<RegistrationForm />);

        fireEvent.input(screen.getByPlaceholderText("Enter your email address"), {
            target: { value: 'invalid-email' }
        });
        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
    });

    it('submits form when values are valid', async () => {
        render(<RegistrationForm />);

        // Assuming username field has a placeholder
        fireEvent.input(screen.getByPlaceholderText("Enter your name"), {
            target: { value: 'testuser' }
        });
        fireEvent.input(screen.getByPlaceholderText("Enter your email address"), {
            target: { value: 'testuser@example.com' }
        });
        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        expect(screen.queryByText('name is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Entered value does not match email format')).not.toBeInTheDocument();
    });

    it("When clicked on clear button, the form should be cleared", async () => {
        render(<RegistrationForm />);
        fireEvent.input(screen.getByPlaceholderText("Enter your name"), {
            target: { value: 'testuser' }
        });
        fireEvent.input(screen.getByPlaceholderText("Enter your email address"), {
            target: { value: 'testuser@example.com' }
        });
        // fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
        fireEvent.click(screen.getByRole('button', { name: /clear/i }));
        const name = screen.getByPlaceholderText("Enter your name") as HTMLInputElement
        const email = screen.getByPlaceholderText("Enter your email address") as HTMLInputElement
        expect(name.value).toBe('')
        expect(email.value).toBe('')
    });

    it("When submit button is clicked, form fields should be cleared", async () => {
        render(<RegistrationForm />);
    
        fireEvent.input(screen.getByPlaceholderText("Enter your name"), {
            target: { value: 'testuser' }
        });
        fireEvent.input(screen.getByPlaceholderText("Enter your email address"), {
            target: { value: 'testuser@example.com' }
        });
        fireEvent.input(screen.getByPlaceholderText("Enter your password"), {
            target: { value: 'Anujpal160180107030@' }
        });
        fireEvent.input(screen.getByPlaceholderText("Confirm your password"), {
            target: { value: 'Anujpal160180107030@' }
        });
    
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
        await waitFor(() => {
            const nameInput = screen.getByPlaceholderText("Enter your name") as HTMLInputElement;
            const emailInput = screen.getByPlaceholderText("Enter your email address") as HTMLInputElement;
    
            // Check if form fields are cleared
            expect(nameInput.value).toBe('');
            expect(emailInput.value).toBe('');
        });
    });
});
