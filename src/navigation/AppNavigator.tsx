import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {RootStackParamList} from './types';

import HomeScreen from '../screens/HomeScreen';
import VideoPlayer1Screen from '../screens/VideoPlayer1Screen';
import VideoPlayer2Screen from '../screens/VideoPlayer2Screen';
import VideoPlayer3Screen from '../screens/VideoPlayer3Screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VideoPlayer1" component={VideoPlayer1Screen} />
        <Stack.Screen name="VideoPlayer2" component={VideoPlayer2Screen} />
        <Stack.Screen name="VideoPlayer3" component={VideoPlayer3Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;