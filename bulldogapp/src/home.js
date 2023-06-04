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
  Image,
} from 'react-native';
import DashboardNavigate from './Navigate/dashboardNavigate';
import {findSingleWorkout} from './features/exerciseSlice';

// Define Dashboard component
export default function Dashboard() {
  // Initialize dispatch
  const dispatch = useDispatch();
  // Initialize loading state
  const [loading, setLoading] = useState(true);

  // Get user and currentWorkout from Redux store
  const {user} = useSelector(state => state.auth);
  const {currentWorkout} = useSelector(state => state.fitness);

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
    )}
    else {
      return (
        <View style={styles.page}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/avatar-bg.png',
              }}
            />
            <Text style={styles.userName}>Welcome {user?.name}</Text>
    
            <View style={styles.listContainer}>
              <View style={styles.item}>
                <Text style={styles.number}>27</Text>
                <Text style={styles.label}>Age</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.number}>77</Text>
                <Text style={styles.label}>Weight</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.number}>123</Text>
                <Text style={styles.label}>Height</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  userName: {
    color: "white",
  },

  container: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    padding: 24,
    margin: 4,
    elevation: 10
  },

  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    margin: 20,
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 16,
  },
  item: {
    flex: 1,
    padding: 8,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  number: {
    fontWeight: 'bold',
  },
  label: {
    color: 'blue', // replace 'blue' with the color code for your 'text-primary' class
  },
});
