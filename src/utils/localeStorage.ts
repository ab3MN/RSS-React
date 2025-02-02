export const LocalStorageUtil = (key: string) => ({
  setItem: (value: unknown) => {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  getItem: () => {
    const item = localStorage.getItem(key);

    if (!item) return null;

    return typeof item !== 'string' ? JSON.parse(item) : item;
  },

  removeItem: () => {
    localStorage.removeItem(key);
  },
});
