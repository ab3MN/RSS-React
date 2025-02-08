import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import NotFoundPage from './NotFoundPage';

type EmptyContainerProps = {
  title: string;
  pathToImg: string;
  alt: string;
};

vi.mock('@/UI/EmptyContainer/EmptyContainer', () => ({
  EmptyContainer: ({ title, pathToImg, alt }: EmptyContainerProps) => (
    <div>
      <h1>{title}</h1>
      <img
        src={pathToImg}
        alt={alt}
      />
    </div>
  ),
}));

describe('NotFoundPage', () => {
  it('renders EmptyContainer with correct props', () => {
    render(<NotFoundPage />);

    expect(screen.getByRole('heading', { name: /no characters found/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /not found/i })).toHaveAttribute('src', '/not-found.png');
  });
});
