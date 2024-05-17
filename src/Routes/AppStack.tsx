import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../pages/HomeScreen';
import DataListScreen from '../components/DataListScreen';
import ProfileScreen from '../pages/ProfileScreen';
import DetailsScreen from '../components/DetailsByIdScreen';
import {
  RegisterCompanyScreen,
  RegisterInvestorScreen,
  RegisterProjectScreen,
  RegisterSellerScreen,
} from '../components/RegisterScreen/RegisterScreen';
import {RootStackParamList} from '../types/navigation';

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
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterCompany"
        component={RegisterCompanyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterProject"
        component={RegisterProjectScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterSeller"
        component={RegisterSellerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterInvestorScreen"
        component={RegisterInvestorScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
