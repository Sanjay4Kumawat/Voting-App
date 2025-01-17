import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import VotingScreen from '../screens/VotingScreen';
import CreateSessionScreen from '../screens/CreateSessionScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
        />
        <Stack.Screen 
          name="Voting" 
          component={VotingScreen}
        />
        <Stack.Screen 
          name="CreateSession" 
          component={CreateSessionScreen}
        />
        <Stack.Screen 
          name="Result" 
          component={ResultScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;