import { useCallback } from 'react';

export function useKeyboardInput(setValue: React.Dispatch<React.SetStateAction<string>>) {
  return useCallback((k: string) => {
    setValue(prev => {
      if (k === 'back') return prev.slice(0, -1);
      if (k === 'shift' || k === '123' || k === 'return') return prev;
      return prev + k;
    });
  }, [setValue]);
}
