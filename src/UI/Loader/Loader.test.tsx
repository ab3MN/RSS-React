import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Loader } from './Loader';

describe('Loader', () => {
  test('should render LoaderIcon with correct fill color', () => {
    render(<Loader />);

    const loaderIcon = screen.getByTestId('loader-icon');

    expect(loaderIcon).toHaveAttribute('fill', '#ABF8FF');
  });
});
