import React from 'react';
import {useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {logout, clearState} from '../features/userSlice';
import Dashboard from '../home';
import Workout from '../Workout';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {TrophyIcon, HomeIcon} from 'react-native-heroicons/solid';

const tab = createMaterialTopTabNavigator();

function DashboardNavigate() {
  const navigation = useNavigation(); // Use useNavigation to access the navigation prop

  const dispatch = useDispatch();
  const logoutUser = async () => {
    const response = await dispatch(logout());
    dispatch(clearState());
    console.log(response);
    if (response) {
      navigation.navigate('Login');
    }
  };

  return (
    <tab.Navigator initialRouteName="Dashboard">
      <tab.Screen
        name="Dashboard"
        component={Dashboard}
      
      />
      {/* <tab.Screen
        name="Workout"
        component={logoutUser}
        options={{
          tabBarIcon: ({color, size}) => (
            <TrophyIcon color={color} size={size} />
          ),
        }}></tab.Screen> */}

<tab.Screen
        name="Workout"
        component={Workout}
    
        >

        </tab.Screen>
    </tab.Navigator>
  );
}

export default DashboardNavigate;
