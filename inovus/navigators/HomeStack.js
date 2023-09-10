import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '../screens/HomePage';
import Logout from '../screens/Logout';
import AllCars from '../screens/AllCars';
import CarInfo from '../screens/CarInfo';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown : false
    }}>
      <Stack.Screen name='HomePage' component={HomePage} />
      <Stack.Screen name='Logout' component={Logout} />
      <Stack.Screen name='AllCars' component={AllCars} />
      <Stack.Screen name='CarInfo' component={CarInfo} />
    </Stack.Navigator>
  );
}