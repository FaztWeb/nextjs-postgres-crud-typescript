import { useState } from 'react';

interface Toggle {
  state: boolean;
  toggle: () => void;
}

const useToggle = (initialState = false): Toggle => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = () => {
    setState(!state);
  };
  return { state, toggle };
};

export default useToggle;
