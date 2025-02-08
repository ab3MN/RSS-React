import { Container } from '../Container/Container';

import LoaderIcon from '@/assets/Loader.svg?react';

import './Loader.scss';

export const Loader = () => (
  <Container style={{ position: 'relative', height: '100vh' }}>
    <LoaderIcon
      fill="#ABF8FF"
      data-testid="loader-icon"
    />
  </Container>
);
