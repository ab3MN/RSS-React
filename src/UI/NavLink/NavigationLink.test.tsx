import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import NavigationLink from './NavigationLink';
import s from './NavigationLink.module.scss';

describe('NavigationLink component', () => {
  it('applies active class when the link is active', () => {
    render(
      <MemoryRouter initialEntries={['/active']}>
        <NavigationLink
          to="/active"
          label="Active Link"
        />
      </MemoryRouter>
    );

    const link = screen.getByText('Active Link');

    expect(link).toHaveClass(s.link);
    expect(link).toHaveClass(s.active);
  });

  it('does not apply active class when the link is not active', () => {
    render(
      <MemoryRouter initialEntries={['/not-active']}>
        <NavigationLink
          to="/active"
          label="Inactive Link"
        />
      </MemoryRouter>
    );

    const link = screen.getByText('Inactive Link');

    expect(link).toHaveClass(s.link);
    expect(link).not.toHaveClass(s.active);
  });

  it('calls handleClick when link is clicked', () => {
    const handleClick = vi.fn();

    render(
      <MemoryRouter>
        <NavigationLink
          to="/active"
          label="Clickable Link"
          handleClick={handleClick}
        />
      </MemoryRouter>
    );

    const link = screen.getByText('Clickable Link');

    fireEvent.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
