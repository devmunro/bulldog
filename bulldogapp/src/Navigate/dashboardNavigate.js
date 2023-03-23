import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginForm from '../login';

import Dashboard from '../home';
import Workout from '../Workout';

const Stack = createBottomTabNavigator();

function DashboardNavigate() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Workout" component={Workout} />

    </Stack.Navigator>
  );
}

export default DashboardNavigate;
