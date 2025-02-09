import { renderHook, act } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { Mock, vi } from 'vitest';

import { useDetailsHandler } from '@/hooks/useDetailsHandler';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe('useDetailsHandler', () => {
  let setSearchParamsMock: Mock;

  beforeEach(() => {
    setSearchParamsMock = vi.fn();
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams({ details: '123' }), setSearchParamsMock]);
  });

  it('should return correct initial values', () => {
    const { result } = renderHook(() => useDetailsHandler(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    expect(result.current.details).toBe('123');
    expect(typeof result.current.closeDetails).toBe('function');
  });

  it('should call setSearchParams when closing details', () => {
    const { result } = renderHook(() => useDetailsHandler(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    act(() => {
      result.current.closeDetails();
    });

    expect(setSearchParamsMock).toHaveBeenCalledWith({});
  });
});
