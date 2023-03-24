import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginForm from '../login';

import Dashboard from '../home';
import Workout from '../Workout';
import {Button} from 'react-native';

const Stack = createBottomTabNavigator();

function DashboardNavigate() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: null,
          headerRight: () => <Button title="Logout" onPress />,
        }}
      />
      <Stack.Screen name="Workout" component={Workout} />
    </Stack.Navigator>
  );
}

export default DashboardNavigate;
