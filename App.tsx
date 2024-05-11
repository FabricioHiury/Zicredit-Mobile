import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Router} from './src/Routes/Router';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return <Router />;
};

export default App;
