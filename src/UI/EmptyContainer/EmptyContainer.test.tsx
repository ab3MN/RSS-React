import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { EmptyContainer } from './EmptyContainer';

import { PATH } from '@/constants/path';

describe('EmptyContainer', () => {
  test('should render the title correctly', () => {
    render(
      <MemoryRouter>
        <EmptyContainer
          title="No data available"
          pathToImg="image.jpg"
          alt="empty"
        />
      </MemoryRouter>
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('should render the image with correct src and alt attributes', () => {
    render(
      <MemoryRouter>
        <EmptyContainer
          title="No data available"
          pathToImg="image.jpg"
          alt="empty"
        />
      </MemoryRouter>
    );

    const image = screen.getByAltText('empty');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'image.jpg');
  });

  test('should render the navigation hint and the link correctly', () => {
    render(
      <MemoryRouter>
        <EmptyContainer
          title="No data available"
          pathToImg="image.jpg"
          alt="empty"
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Go to the/)).toBeInTheDocument();

    const link = screen.getByText('Characters');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', PATH.CHARACTERS);
  });
});
