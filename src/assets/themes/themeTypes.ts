import { lightTheme } from './lightTheme';

export type CustomDefaultTheme = typeof lightTheme;

export type ThemeStatus = 'dark' | 'light';

export type ColorType = keyof CustomDefaultTheme['colors'];
