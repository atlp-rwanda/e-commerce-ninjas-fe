// Button.test.tsx
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/buttons/Button';

describe('Button Component', () => {
  it('renders button with correct title', () => {
    const title = 'Click me';
    const type = 'button';
    render(<Button title={title} type={type} />);
    const buttonElement = screen.getByRole('button', { name: title });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders button with correct type', () => {
    const title = 'Submit';
    render(<Button title={title} type="submit" />);
    const buttonElement = screen.getByRole('button', { name: title });
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
