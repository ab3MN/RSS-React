import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  test('should render with correct placeholder and value', () => {
    render(
      <Input
        value="Test value"
        handleChange={vi.fn()}
      />
    );

    const inputElement = screen.getByPlaceholderText('Search');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Test value');
  });

  test('should call handleChange when the input value changes', () => {
    const handleChangeMock = vi.fn();

    render(
      <Input
        value=""
        handleChange={handleChangeMock}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'New value' },
    });

    expect(handleChangeMock).toHaveBeenCalledTimes(1);
  });

  test('should not call handleChange if value is the same', () => {
    const handleChangeMock = vi.fn();

    render(
      <Input
        value="Initial value"
        handleChange={handleChangeMock}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'Initial value' },
    });

    expect(handleChangeMock).not.toHaveBeenCalled();
  });
});
