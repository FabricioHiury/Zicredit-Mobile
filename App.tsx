import React from 'react';
import {Router} from './src/Routes/Router';
import {AuthProvider} from './src/context/AuthContext/AuthContext';
import { ThemeProvider } from './src/assets/themes/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
