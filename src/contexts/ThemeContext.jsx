/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    useEffect(() => {
      const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
      setIsDarkMode(darkModeEnabled);
      if (darkModeEnabled) {
        document.documentElement.classList.add('dark');
      }
    }, []);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      }
    };
  
    return (
      <ThemeContext.Provider
        value={{
          isDarkMode,
          toggleDarkMode,
        }}>
        {children}
      </ThemeContext.Provider>
    );
  };

export const useTheme = () => useContext(ThemeContext)