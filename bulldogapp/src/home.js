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

// Define Dashboard component
export default function Dashboard() {
  // Initialize dispatch
  const dispatch = useDispatch(); 
  // Initialize loading state
  const [loading, setLoading] = useState(true); 

  // Get user and currentWorkout from Redux store
  const { user } = useSelector((state) => state.auth);
  const { currentWorkout } = useSelector((state) => state.fitness);

  // Load user details when component mounts
  useEffect(() => {
    const getUser = async () => {
      await dispatch(getUserDetails());
      setLoading(false);
    };

    getUser();
  }, []);

  // Load current workout when user is available
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

  // Show loading indicator while loading
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Show user details and workout information
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
