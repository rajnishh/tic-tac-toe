import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import GameScreen from '../screens/GameScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileMenu from '../screens/ProfileMenu';
import GameStats from '../screens/GameStats';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="ProfileMenu" component={ProfileMenu} />
        <Stack.Screen name="GameStats" component={GameStats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
