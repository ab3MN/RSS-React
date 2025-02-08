import { FC } from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import ErrorBoundary from './ErrorBoundary';

const Foo: FC = () => {
  throw new Error('Oh no');
};

describe('Renders ErrorBoundary Components', () => {
  test('', async () => {
    render(
      <ErrorBoundary>
        <Foo />
      </ErrorBoundary>
    );
    const text = screen.getByText(/oh no/i);
    const title = screen.getByTestId('error-title');

    expect(text).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    const button = screen.getByRole('button');

    await userEvent.click(button);
  });

  test('', () => {
    render(
      <ErrorBoundary>
        <h1>Test Error</h1>
      </ErrorBoundary>
    );
    const text = screen.getByText(/test error/i);

    expect(text).toBeInTheDocument();
  });
});
