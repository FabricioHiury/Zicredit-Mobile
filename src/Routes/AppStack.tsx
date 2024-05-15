import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../pages/HomeScreen';
import { RootStackParamList } from '../types/navigation';
import DataListScreen from '../components/DataListScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DataList"
        component={DataListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
