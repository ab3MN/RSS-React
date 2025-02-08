import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useFetchCharacter } from './useFetchCharacter';

describe('useFetchCharacter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with null character data', () => {
    const { result } = renderHook(() => useFetchCharacter());

    expect(result.current.data).toBeNull();
  });
});
