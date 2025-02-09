import { renderHook } from '@testing-library/react';

import { useFetchCharacter } from './useFetchCharacter';

describe('useFetchCharacter', () => {
  it('should initialize with null character data', () => {
    const { result } = renderHook(() => useFetchCharacter());

    expect(result.current.data).toBeNull();
  });
});
