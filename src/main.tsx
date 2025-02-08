import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './styles/main.scss';
import { Root } from './Root';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
