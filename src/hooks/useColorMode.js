// src/hooks/useColorMode.js
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

export const useColorMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(() => {
    const stored = localStorage.getItem('color-mode');
    return stored ? stored : prefersDarkMode ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('color-mode', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { mode, toggleColorMode };
};
