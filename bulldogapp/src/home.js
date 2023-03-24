import React, { useState, useEffect } from 'react';
import { clearState, getUserDetails, loginUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
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
import { findSingleWorkout } from './features/exerciseSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const { currentWorkout } = useSelector((state) => state.fitness);

  useEffect(() => {
    const getUser = async () => {
      await dispatch(getUserDetails());
      setLoading(false);
    };

    getUser();
  }, []);

  useEffect(() => {
    const getCurrentWorkout = async () => {
      if (user) {
        setLoading(true);
        await dispatch(findSingleWorkout(user.defaultWorkout));
        setLoading(false);
      }
    };

    getCurrentWorkout();
  }, [user]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {user && currentWorkout && (
        <View>
          <Text>hello {user.name}</Text>
          <Text>Your workout is {currentWorkout.name}</Text>
        </View>
      )}
      {user && !currentWorkout && (
        <View>
          <Text>hello {user.name}</Text>
        </View>
      )}
    </View>
  );
}
