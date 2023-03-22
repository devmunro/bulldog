import React, {useState, useEffect} from 'react';
import {clearState, loginUser} from './features/userSlice';
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

export default function Dashboard() {
  return (
    <View style>
      <Text style>hello</Text>
      
    </View>
  );
}
