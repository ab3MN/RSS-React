import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { PATH } from './constants/path';
import { RedirectToCharacters } from './pages/Redirects';
import { Pages } from './routing/routes';

export const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={PATH.HOME}
        element={<App />}
      >
        <Route
          index
          element={<RedirectToCharacters />}
        />

        <Route
          index
          path={PATH.CART}
          element={<Pages.CartPage />}
        />

        <Route
          path={PATH.CHARACTERS}
          element={<Pages.CharactersPage />}
        >
          <Route
            index
            element={<Pages.CharacterPage />}
          />
        </Route>

        <Route
          path={'*'}
          element={<Pages.NotFoundPage />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
