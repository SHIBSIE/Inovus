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
import CompareChooseCar from '../screens/CompareChooseCar';
import Comparison from '../screens/Comparison';
import CompareChooseCar2 from '../screens/CompareChooseCar2';
import ComparingBoth from '../screens/ComparingBoth';
import Survey from '../screens/Survey';
import ContactUs from '../screens/ContactUs';


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
      <Stack.Screen name='CompareChooseCar' component={CompareChooseCar} />
      <Stack.Screen name='CompareChooseCar2' component={CompareChooseCar2} />
      <Stack.Screen name='Comparison' component={Comparison} />
      <Stack.Screen name='ComparingBoth' component={ComparingBoth} />
      <Stack.Screen name='Survey' component={Survey} />
      <Stack.Screen name='ContactUs' component={ContactUs} />
    </Stack.Navigator>
  );
}