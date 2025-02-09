import { renderHook, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';

import useLocaLStorage from './useLocaLStorage';
import { useSearch } from './useSearch';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(() => [new URLSearchParams()]),
  };
});

vi.mock('./useLocaLStorage', () => ({
  default: vi.fn(() => ({
    getItem: vi.fn(() => ''),
    setItem: vi.fn<(value: string) => void>(),
    removeItem: vi.fn<() => void>(),
  })),
}));

describe('useSearch', () => {
  let navigate: ReturnType<typeof useNavigate>;
  let localStorageMock: ReturnType<typeof useLocaLStorage>;

  beforeEach(() => {
    navigate = vi.fn();
    localStorageMock = {
      getItem: vi.fn(() => ''),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };

    vi.mocked(useNavigate).mockReturnValue(navigate);
    vi.mocked(useLocaLStorage).mockReturnValue(localStorageMock);
  });

  it('should initialize with stored search value if available', () => {
    vi.mocked(localStorageMock.getItem).mockReturnValue('savedSearch');

    const { result } = renderHook(() => useSearch(), { wrapper: MemoryRouter });

    expect(result.current.initialSearch).toBe('savedSearch');
  });

  it('should reset initialSearch when handleChange is called', () => {
    vi.mocked(localStorageMock.getItem).mockReturnValue('savedSearch');

    const { result } = renderHook(() => useSearch(), { wrapper: MemoryRouter });

    act(() => {
      result.current.handleChange({ target: { value: 'new value' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.initialSearch).toBe('');
  });

  it('should update search state on handleChange', () => {
    const { result } = renderHook(() => useSearch(), { wrapper: MemoryRouter });

    act(() => {
      result.current.handleChange({ target: { value: 'test' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.search).toBe('test');
  });

  it('should clear search and remove from localStorage on handleClear', () => {
    const { result } = renderHook(() => useSearch(), { wrapper: MemoryRouter });

    act(() => {
      result.current.handleClear();
    });

    expect(result.current.search).toBe('');
    expect(localStorageMock.removeItem).toHaveBeenCalled();
  });

  it('should save search and navigate on handleSubmit', () => {
    const { result } = renderHook(() => useSearch(), { wrapper: MemoryRouter });

    act(() => {
      result.current.handleChange({ target: { value: 'vitest' } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
        currentTarget: document.createElement('form'),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('vitest');
    expect(navigate).toHaveBeenCalledWith('?page=1&search=vitest');
  });
});
