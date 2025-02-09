import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { IconButton } from './IconButton';

describe('IconButton', () => {
  test('should render button with children', () => {
    render(
      <IconButton>
        <span>Click Me</span>
      </IconButton>
    );

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('should handle onClick event', () => {
    const onClickMock = vi.fn();

    render(
      <IconButton onClick={onClickMock}>
        <span>Click Me</span>
      </IconButton>
    );

    fireEvent.click(screen.getByText('Click Me'));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('should render button with default type "button"', () => {
    render(
      <IconButton>
        <span>Click Me</span>
      </IconButton>
    );

    const button = screen.getByText('Click Me').closest('button');

    expect(button).toHaveAttribute('type', 'button');
  });

  test('should render button with custom type "submit"', () => {
    render(
      <IconButton type="submit">
        <span>Submit</span>
      </IconButton>
    );

    const button = screen.getByText('Submit').closest('button');

    expect(button).toHaveAttribute('type', 'submit');
  });
});
