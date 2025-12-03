import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Inicializa el tema desde localStorage o usa 'system' por defecto
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'system';
  });

  // Función para obtener el tema efectivo (resuelve 'system' al tema real)
  const getEffectiveTheme = useCallback(() => {
    if (theme === 'system') {
      return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }, [theme]);

  useEffect(() => {
    const root = globalThis.document.documentElement;

    // Remover clases de tema previas
    root.classList.remove('light', 'dark');

    // Aplicar el tema efectivo
    const effectiveTheme = getEffectiveTheme();
    root.classList.add(effectiveTheme);

    // Guardar en localStorage
    localStorage.setItem('theme', theme);

    // Listener para cambios en el tema del sistema
    const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        root.classList.remove('light', 'dark');
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.add(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, getEffectiveTheme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    effectiveTheme: getEffectiveTheme(),
    isDark: getEffectiveTheme() === 'dark',
    isLight: getEffectiveTheme() === 'light',
  }), [theme, getEffectiveTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

