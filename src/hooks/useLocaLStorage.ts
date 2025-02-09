interface UseLocalStorage {
  setItem: (value: unknown) => void;
  getItem: () => unknown;
  removeItem: () => void;
}

const useLocaLStorage = (key: string): UseLocalStorage => {
  const setItem = (value: unknown): void => {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getItem = () => {
    const item = localStorage.getItem(key);

    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  };

  const removeItem = (): void => localStorage.removeItem(key);

  return { setItem, getItem, removeItem };
};

export default useLocaLStorage;
