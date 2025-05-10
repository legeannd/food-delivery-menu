const LOCAL_STORAGE_PREFIX = "food-delivery-menu@1.0.0:";

export const useLocalStorage = () => {
  const getLocalStorage = (key: string) => {
    if (typeof window === "undefined") {
      return null;
    }

    const value = localStorage.getItem(`${LOCAL_STORAGE_PREFIX + key}`);

    if (value && value !== undefined) {
      return JSON.parse(value);
    }

    return null;
  };

  const setLocalStorage = (key: string, value: object) => {
    if (typeof window === "undefined") {
      return null;
    }

    localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX + key}`,
      JSON.stringify(value)
    );
  };

  return {
    getLocalStorage,
    setLocalStorage,
  };
};
