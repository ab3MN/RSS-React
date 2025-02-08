import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';

import { useFetchData } from './useFetchData';

const mockFetchData = vi.fn();

describe('useFetchData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useFetchData([], mockFetchData));

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch data and update state', async () => {
    const mockData = [{ id: 1, name: 'Item 1' }];

    mockFetchData.mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetchData([], mockFetchData));

    await act(async () => {
      await result.current.fetchData('param');
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    mockFetchData.mockRejectedValue(new Error('Fetch failed'));

    const { result } = renderHook(() => useFetchData([], mockFetchData));

    await act(async () => {
      await result.current.fetchData('param');
    });

    expect(result.current.error).toBe('Fetch failed');
    expect(result.current.isLoading).toBe(false);
  });

  it('should set error if response is a string', async () => {
    mockFetchData.mockResolvedValue('Some error');

    const { result } = renderHook(() => useFetchData([], mockFetchData));

    await act(async () => {
      await result.current.fetchData('param');
    });

    expect(result.current.error).toBe('Some error');
    expect(result.current.isLoading).toBe(false);
  });
});
