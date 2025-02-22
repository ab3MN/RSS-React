import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../hooks';
import { store } from '../store';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');

  return {
    ...actual,
    useDispatch: vi.fn(() => vi.fn()),
    useSelector: vi.fn((selector) => selector({})),
  };
});

describe('useAppDispatch', () => {
  it('returns the dispatch function', () => {
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(typeof result.current).toBe('function');
  });
});

describe('useAppSelector', () => {
  it('returns selected state', () => {
    const mockSelector = vi.fn(() => 'test state');

    const { result } = renderHook(() => useAppSelector(mockSelector), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(mockSelector).toHaveBeenCalled();
    expect(result.current).toBe('test state');
  });
});
