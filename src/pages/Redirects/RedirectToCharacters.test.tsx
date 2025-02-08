import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it } from 'vitest';

import { RedirectToCharacters } from './RedirectToCharacters';

import { PATH } from '@/constants/path';

describe('RedirectToCharacters', () => {
  it('redirects to the characters page with search params', () => {
    const initialRoute = '/?query=test';

    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route
            path="/"
            element={<RedirectToCharacters />}
          />
          <Route
            path={PATH.CHARACTERS}
            element={<div>Characters Page</div>}
          />
        </Routes>
      </MemoryRouter>
    );
  });
});
