import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import { App } from './App';
import { PATH } from './constants/path';
import { CharactersPage } from './pages/CharactersPage/CharactersPage';
import { CharacterPage } from './pages/CharacterPage/CharacterPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={PATH.HOME}
        element={<App />}
      >
        <Route
          index
          element={<Navigate to={PATH.CHARACTERS} />}
        />

        <Route
          path={PATH.CHARACTERS}
          element={<CharactersPage />}
        >
          <Route
            index
            element={<CharacterPage />}
          />
        </Route>

        <Route
          path={'*'}
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
