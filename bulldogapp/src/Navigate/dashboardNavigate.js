import React from 'react';
import {useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {logout} from '../features/userSlice';
import Dashboard from '../home';
import Workout from '../Workout';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

const Stack = createBottomTabNavigator();

function DashboardNavigate() {
  const navigation = useNavigation(); // Use useNavigation to access the navigation prop

  const dispatch = useDispatch();
  const logoutUser = async () => {
    const response = await dispatch(logout());
    console.log(response);
    if (response) {
      navigation.navigate('Login'); 
    }
  };

  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: null,
          headerRight: () => <Button title="Logout" onPress={logoutUser} />,
        }}
      />
      <Stack.Screen name="Workout" component={Workout} />
    </Stack.Navigator>
  );
}

export default DashboardNavigate;
