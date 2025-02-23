import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, vi } from 'vitest';

import { RedirectToCharacters } from './RedirectToCharacters';

import { PATH } from '@/constants/path';

vi.mock('@/hooks/useLocaLStorage', () => ({
  default: () => ({
    getItem: vi.fn(() => 'storedSearchValue'),
  }),
}));

describe('RedirectToCharacters', () => {
  it('redirects to the characters page with search params from localStorage', () => {
    render(
      <MemoryRouter initialEntries={[PATH.HOME]}>
        <Routes>
          <Route
            path={PATH.HOME}
            element={<RedirectToCharacters />}
          />
          <Route
            path={`${PATH.CHARACTERS}`}
            element={<div>Characters Page</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Characters Page')).toBeInTheDocument();
  });
});
