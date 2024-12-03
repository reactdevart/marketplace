import { useEffect } from 'react';

export const useOutsideClick = (ref, callback, isEnabled) => {
  useEffect(() => {
    if (!isEnabled) return;
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, isEnabled]);
};
