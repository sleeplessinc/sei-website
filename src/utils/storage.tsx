import { useEffect, useState } from 'react';

const useStateWithLocalStorage = (
  localStorageKey: string,
): [value: string, setValue: React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(localStorage.getItem(localStorageKey) || '');

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

export default useStateWithLocalStorage;
