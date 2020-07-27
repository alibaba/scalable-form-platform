import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export function useControlState<T = any>(stateValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(stateValue);

  useEffect(() => {
    setState(stateValue);
  }, [stateValue, setState]);

  return [state, setState];
}
