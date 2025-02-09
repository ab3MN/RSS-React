import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { SearchLink } from './SearchLink';

import { getSearchWith } from '@/utils/URLHelpers';

vi.mock('@/utils/URLHelpers', () => ({
  getSearchWith: vi.fn(),
}));

describe('SearchLink', () => {
  it('renders with correct search params', () => {
    const mockParams = { key: 'value' };
    const mockSearch = '?key=value';

    const mockedGetSearchWith = vi.mocked(getSearchWith);

    mockedGetSearchWith.mockReturnValue(mockSearch);

    render(
      <MemoryRouter initialEntries={['/some-path']}>
        <SearchLink params={mockParams}>Click me</SearchLink>
      </MemoryRouter>
    );

    const link = screen.getByText('Click me');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/some-path${mockSearch}`);
  });
});
