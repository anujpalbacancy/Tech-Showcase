import RegistrationForm from '@/app/form-validation/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Page', () => {
    it('renders a heading', () => {
        render(<RegistrationForm />)
        console.log({ screen });

    })
})