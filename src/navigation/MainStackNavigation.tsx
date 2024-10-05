import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenKey from '../constants/ScreenKey';
import MainTabNavigator from './MainTabNavigation';

const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenKey.MAIN_TAB} component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
