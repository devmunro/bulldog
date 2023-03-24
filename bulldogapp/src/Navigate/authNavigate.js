import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginForm from '../login';

import Dashboard from '../home';
import DashboardNavigate from './dashboardNavigate';
import { Button } from 'react-native';

const Stack = createStackNavigator();

function AuthNavigate() {
  return (
    <Stack.Navigator initialRouteName="Login" 
      
      >
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen
        name="Dashboard"
        component={DashboardNavigate}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigate;
