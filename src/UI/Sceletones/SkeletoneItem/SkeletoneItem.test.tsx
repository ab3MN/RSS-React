import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { SkeletoneItem } from './SkeletoneItem';

describe('SkeletoneItem', () => {
  test('should render SceletonLight SVG', () => {
    render(<SkeletoneItem />);

    const skeletonIcon = screen.getByTestId('sceleton-light');

    expect(skeletonIcon).toBeInTheDocument();
  });
});
