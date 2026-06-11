import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context.js';

const SYSTEM_QUERY = '(prefers-color-scheme: dark)';

const getSystemTheme = () =>
  globalThis.matchMedia(SYSTEM_QUERY).matches ? 'dark' : 'light';

export const ThemeProvider = ({ children }) => {
  // Preferencia del usuario: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'system';
  });

  // Tema del SO como estado reactivo (no se toca el DOM por fuera de React)
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  // Suscripción a los cambios de tema del SO
  useEffect(() => {
    const mediaQuery = globalThis.matchMedia(SYSTEM_QUERY);
    const handleChange = (e) => setSystemTheme(e.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Tema efectivo derivado: si la preferencia es 'system', usa el del SO
  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  // Aplica la clase al DOM y persiste la preferencia
  useEffect(() => {
    const root = globalThis.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(effectiveTheme);
    localStorage.setItem('theme', theme);
  }, [theme, effectiveTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      effectiveTheme,
      isDark: effectiveTheme === 'dark',
      isLight: effectiveTheme === 'light',
    }),
    [theme, effectiveTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
