import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Container } from './Container';

describe('Container', () => {
  test('should render children correctly', () => {
    render(
      <Container title="Test Title">
        <div>Child Content</div>
      </Container>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  test('should render title when passed', () => {
    render(
      <Container title="Test Title">
        <div>Child Content</div>
      </Container>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('should not render title when not passed', () => {
    render(
      <Container>
        <div>Child Content</div>
      </Container>
    );

    expect(screen.queryByText('Test Title')).toBeNull();
  });

  test('should apply custom padding to title', () => {
    render(
      <Container
        title="Test Title"
        titlePB="40px"
      >
        <div>Child Content</div>
      </Container>
    );

    const titleElement = screen.getByText('Test Title');

    expect(titleElement).toHaveStyle('padding-bottom: 40px');
  });
});
