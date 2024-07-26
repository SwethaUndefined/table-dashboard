// src/components/ProductsPage/ProductsPage.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ProductsPage from './ProductsPage';

// Mock the axios module
jest.mock('axios');

const mockProducts = {
  data: {
    products: [
      {
        id: 1,
        title: 'Product 1',
        description: 'Description 1',
        category: 'Category 1',
        price: 100,
        discountPercentage: 10,
        rating: 4.5,
        stock: 20,
        tags: ['Tag1'],
        brand: 'Brand 1',
        reviews: [
          { comment: 'Great product', rating: 5 }
        ]
      }
    ]
  }
};

describe('ProductsPage', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(mockProducts);
  });

  test('renders the products table and modal', async () => {
    render(<ProductsPage />);

    // Check if the heading is rendered
    expect(screen.getByText('List of products:')).toBeInTheDocument();

    // Wait for the products to be fetched and displayed
    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());

    // Check if the modal opens when clicking the "View Reviews" button
    fireEvent.click(screen.getByTestId('PreviewIcon'));
    expect(screen.getByText('Reviews for Product 1')).toBeInTheDocument();
    expect(screen.getByText('Great product - Rating: 5')).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch products'));

    render(<ProductsPage />);

    await waitFor(() => {
      expect(screen.queryByText('List of products:')).not.toBeInTheDocument();
    });
  });
});
