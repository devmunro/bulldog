import React, {useState, useEffect} from 'react';
import {clearState, getUserDetails, loginUser} from './features/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DashboardNavigate from './Navigate/dashboardNavigate';
import {findSingleWorkout} from './features/exerciseSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      const getDetails = await dispatch(getUserDetails());
    };
    const getCurrentworkout = async () => {
      const getWorkout = await dispatch(findSingleWorkout(user.defaultWorkout));
      console.log(getWorkout);
      console.log(currentWorkout);
    };

    getUser();
    if (user) {
      getCurrentworkout();
    }
  }, []);

  const {user} = useSelector(state => state.auth);
  const {currentWorkout} = useSelector(state => state.fitness);

  return (
    <View >
      {user && currentWorkout && (
        <View>
          <Text >hello {user.name}</Text>
          <Text >Your workout is {currentWorkout.name}</Text>
        </View>
      )}
    </View>
  );
}
