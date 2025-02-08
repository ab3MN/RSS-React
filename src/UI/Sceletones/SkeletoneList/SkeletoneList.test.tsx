import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { SkeletoneList } from './SkeletoneList';

vi.stubGlobal('crypto', {
  randomUUID: vi.fn(() => 'unique-id'),
});

describe('SkeletoneList', () => {
  test('should render the Container component', () => {
    render(<SkeletoneList length={3} />);

    const container = screen.getByTestId('skeletone-list-container');

    expect(container).toBeInTheDocument();
  });
});
