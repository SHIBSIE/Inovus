import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '../screens/HomePage';
import Logout from '../screens/Logout';
import AllCars from '../screens/AllCars';
import CarInfo from '../screens/CarInfo';
import FilteredCars from '../screens/FilteredCars';
import Available from '../screens/Available';
import CarBooked from '../screens/CarBooked';
import ElectricCars from '../screens/ElectricCars';
import CarInfoElectric from '../screens/CarInfoElectric';
import BookingInfo from '../screens/BookingInfo';
import Recommendation from '../screens/Recommendation';
import Compare from '../screens/Compare';

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
      <Stack.Screen name='FilteredCars' component={FilteredCars} />
      <Stack.Screen name='Available' component={Available} />
      <Stack.Screen name='CarBooked' component={CarBooked} />
      <Stack.Screen name='ElectricCars' component={ElectricCars} />
      <Stack.Screen name='CarInfoElectric' component={CarInfoElectric} />
      <Stack.Screen name='BookingInfo' component={BookingInfo} />
      <Stack.Screen name='Recommendation' component={Recommendation} />
      <Stack.Screen name='Compare' component={Compare} />
    </Stack.Navigator>
  );
}