// PostsTable.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useQuery } from '@tanstack/react-query';
import PostsTable from '@/app/posts/page';

// Mock the useQuery hook
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

const mockData = [
  { id: 1, userId: 1, title: 'Test Title 1', body: 'Test Body 1' },
  { id: 2, userId: 2, title: 'Test Title 2', body: 'Test Body 2' },
  { id: 3, userId: 3, title: 'Test Title 3', body: 'Test Body 3' },
  { id: 4, userId: 4, title: 'Test Title 4', body: 'Test Body 4' },
  { id: 5, userId: 5, title: 'Test Title 5', body: 'Test Body 5' },
  { id: 6, userId: 6, title: 'Test Title 6', body: 'Test Body 6' },
  { id: 7, userId: 7, title: 'Test Title 7', body: 'Test Body 7' },
  { id: 8, userId: 8, title: 'Test Title 8', body: 'Test Body 8' },
  { id: 9, userId: 9, title: 'Test Title 9', body: 'Test Body 9' },
  { id: 10, userId: 10, title: 'Test Title 10', body: 'Test Body 10' },
  { id: 11, userId: 11, title: 'Test Title 11', body: 'Test Body 11' },
  { id: 12, userId: 12, title: 'Test Title 12', body: 'Test Body 12' },
  { id: 13, userId: 13, title: 'Test Title 13', body: 'Test Body 13' },
  { id: 14, userId: 14, title: 'Test Title 14', body: 'Test Body 14' },
  { id: 15, userId: 15, title: 'Test Title 15', body: 'Test Body 15' },
  { id: 16, userId: 16, title: 'Test Title 16', body: 'Test Body 16' },
  { id: 17, userId: 17, title: 'Test Title 17', body: 'Test Body 17' },
  { id: 18, userId: 18, title: 'Test Title 18', body: 'Test Body 18' },
  { id: 19, userId: 19, title: 'Test Title 19', body: 'Test Body 19' },
  { id: 20, userId: 20, title: 'Test Title 20', body: 'Test Body 20' },
];

describe('PostsTable', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });
  });

  it('renders the table with data', () => {
    renderWithClient(<PostsTable />);
    expect(screen.getByText('Posts Table')).toBeInTheDocument();
    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });
    renderWithClient(<PostsTable />);
    expect(screen.getByText('Loading Posts...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: { message: 'Error fetching data' },
    });
    renderWithClient(<PostsTable />);
    expect(screen.getByText('Error: Error fetching data')).toBeInTheDocument();
  });

  it('filters the table data based on search input', async () => {
    renderWithClient(<PostsTable />);
    const searchInput = screen.getByPlaceholderText('Search...');

    fireEvent.change(searchInput, { target: { value: 'Test Body 1' } });

    await waitFor(() => {
      expect(screen.getByText('Test Title 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Title 2')).not.toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    renderWithClient(<PostsTable />);

    // Access the previous and next page buttons using data-testid
    const prevPageButton = screen.getByTestId('prev-page-button');
    const nextPageButton = screen.getByTestId('next-page-button');

    // Simulate clicking the next page button
    fireEvent.click(nextPageButton);
    console.log({ screen: screen.debug() });

    await waitFor(() => {
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument(); // Adjust based on actual page count
    });

    fireEvent.click(prevPageButton);

    await waitFor(() => {
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });
  });
});
