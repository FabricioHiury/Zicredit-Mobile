import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: typeof darkTheme | typeof lightTheme;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  theme: darkTheme, 
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      if (savedTheme !== null) {
        const isDarkMode = JSON.parse(savedTheme);
        setDarkMode(isDarkMode);
        setTheme(isDarkMode ? darkTheme : lightTheme);
      }
    };
    loadTheme();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      setTheme(newMode ? darkTheme : lightTheme);
      AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
