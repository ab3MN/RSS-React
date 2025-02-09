// Pagination.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { Pagination } from './Pagination';

vi.mock('@/utils/getSearchPage', () => ({
  getSearchPage: vi.fn(),
}));

describe('Pagination', () => {
  it('should render previous and next buttons', () => {
    vi.fn().mockReturnValue(2);
    render(
      <MemoryRouter initialEntries={['/some-path?page=2']}>
        <Pagination totalPage={5} />
      </MemoryRouter>
    );

    const prevButton = screen.getByTestId('prev');
    const nextButton = screen.getByTestId('next');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });
});
