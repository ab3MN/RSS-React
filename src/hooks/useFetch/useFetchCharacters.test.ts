import { renderHook } from '@testing-library/react';

import { useFetchCharacters } from './useFetchCharacters';

describe('useFetchCharacters', () => {
  it('should initialize with default character data', () => {
    const { result } = renderHook(() => useFetchCharacters());

    expect(result.current.data).toEqual({ count: 0, next: null, previous: null, results: [] });
  });
});
