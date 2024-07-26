// src/components/LoginPage/LoginPage.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './LoginPage';

// Mock the axios module
jest.mock('axios');

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('LoginPage', () => {
  test('renders login form', () => {
    renderWithRouter(<LoginPage />);

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('handles login and redirects to products page', async () => {
    axios.post.mockResolvedValue({ status: 200 });

    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'emilys' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'emilyspass' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/products');
    });
  });

  test('shows error message on login failure', async () => {
    axios.post.mockRejectedValue(new Error('Login failed'));

    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'emilys' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'emilyspass' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
    });
  });
});
