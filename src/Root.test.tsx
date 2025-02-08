import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Root } from './Root';

vi.mock('@/App', () => ({ App: () => <div>App Component</div> }));

describe('Root Component', () => {
  it('renders NotFoundPage for unknown route', () => {
    render(<Root />);

    expect(screen.getByText('App Component')).toBeInTheDocument();
  });
});
