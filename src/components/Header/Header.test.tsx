import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { Header } from './Header';

import { useSearch } from '@/hooks/useSearch';
import { PATH } from '@/constants/path';

vi.mock('@/hooks/useSearch', () => ({
  useSearch: vi.fn(),
}));

describe('Header', () => {
  it('should render the logo and CustomLink', () => {
    const mockedUseSearch = vi.mocked(useSearch);

    mockedUseSearch.mockReturnValue({
      search: '',
      handleChange: vi.fn(),
      handleClear: vi.fn(),
      handleSubmit: vi.fn(),
      setItem: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveAttribute('href', PATH.HOME);
  });

  it('should call handleClear when the logo is clicked', () => {
    const handleClear = vi.fn();
    const mockedUseSearch = vi.mocked(useSearch);

    mockedUseSearch.mockReturnValue({
      search: '',
      handleChange: vi.fn(),
      handleClear,
      handleSubmit: vi.fn(),
      setItem: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('heading', { level: 1 }));

    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('should submit the search form when the submit button is clicked', () => {
    const handleSubmit = vi.fn();

    const mockedUseSearch = vi.mocked(useSearch);

    mockedUseSearch.mockReturnValue({
      search: '',
      handleChange: vi.fn(),
      handleClear: vi.fn(),
      handleSubmit,
      setItem: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('form'));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
