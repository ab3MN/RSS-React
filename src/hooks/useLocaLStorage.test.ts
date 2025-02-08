import { renderHook, act } from '@testing-library/react';

import useLocaLStorage from './useLocaLStorage';

describe('useLocaLStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should store and retrieve a string value', () => {
    const { result } = renderHook(() => useLocaLStorage('testKey'));

    act(() => {
      result.current.setItem('testValue');
    });

    expect(result.current.getItem()).toBe('testValue');
  });

  it('should store and retrieve an object value', () => {
    const { result } = renderHook(() => useLocaLStorage('testKey'));
    const testObject = { name: 'Alice', age: 25 };

    act(() => {
      result.current.setItem(testObject);
    });

    expect(result.current.getItem()).toEqual(testObject);
  });

  it('should remove item from localStorage', () => {
    const { result } = renderHook(() => useLocaLStorage('testKey'));

    act(() => {
      result.current.setItem('testValue');
    });

    act(() => {
      result.current.removeItem();
    });

    expect(result.current.getItem()).toBeNull();
  });
});
