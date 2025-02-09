import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { SearchForm } from './SearchForm';

describe('SearchForm', () => {
  test('should call handleChange when typing in the input', () => {
    const handleChange = vi.fn();

    render(
      <SearchForm
        value=""
        handleChange={handleChange}
        handleClear={() => {}}
        handleSubmit={() => {}}
      />
    );

    const input = screen.getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: 'Test' } });

    expect(handleChange).toHaveBeenCalled();
  });

  test('should call handleSubmit when the form is submitted', () => {
    const handleSubmit = vi.fn();

    render(
      <SearchForm
        value=""
        handleChange={() => {}}
        handleClear={() => {}}
        handleSubmit={handleSubmit}
      />
    );

    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
