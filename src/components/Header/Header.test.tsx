import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { Header } from './Header';

import { useSearch } from '@/hooks/useSearch';
import { PATH } from '@/constants/path';

vi.mock('@/hooks/useSearch');

describe('Header', () => {
  let mockedUseSearch: ReturnType<typeof useSearch>;

  beforeEach(() => {
    mockedUseSearch = {
      search: '',
      handleChange: vi.fn(),
      handleClear: vi.fn(),
      handleSubmit: vi.fn(),
      setItem: vi.fn(),
      initialSearch: 'Initial value',
    };

    vi.mocked(useSearch).mockReturnValue(mockedUseSearch);
  });

  it('should render the logo and CustomLink', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', PATH.HOME);
  });

  it('should call handleClear when the logo is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('heading', { level: 1 }));

    expect(mockedUseSearch.handleClear).toHaveBeenCalledTimes(1);
  });

  it('should submit the search form when the submit button is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('form'));

    expect(mockedUseSearch.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should pass correct value to SearchForm', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('textbox')).toHaveValue('Initial value');

    mockedUseSearch.search = 'Test search';
    vi.mocked(useSearch).mockReturnValue(mockedUseSearch);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });
});
