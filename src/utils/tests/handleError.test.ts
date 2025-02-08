import { describe, expect, it } from 'vitest';

import { handleError } from '../handleError';

describe('handleError', () => {
  it('should return the error message if the error is an instance of Error', () => {
    const error = new Error('Something went wrong');

    expect(handleError(error)).toBe('Something went wrong');
  });

  it('should return "An unknown error occurred" if the error is not an instance of Error', () => {
    expect(handleError('Some string')).toBe('An unknown error occurred');
    expect(handleError(404)).toBe('An unknown error occurred');
    expect(handleError(null)).toBe('An unknown error occurred');
    expect(handleError(undefined)).toBe('An unknown error occurred');
  });
});
