import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Router} from './src/Routes/Router';
import {AuthProvider} from './src/context/AuthContext/AuthContext';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
