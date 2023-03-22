import React, { useState, useEffect } from 'react';
import { clearState, loginUser } from './features/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

 
  const { loading, error, success } = useSelector((state) => state.auth);
 
  const dispatch = useDispatch();
  const navigation = useNavigation();

 
  const handleInputChange = (name, value) => {
    
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // handle submit
  const handleLogin = async () => {
    console.log("submitting")
    console.log(loginData)
   const loggingIn = await  dispatch(loginUser(loginData));
    console.log(loggingIn)
 
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if(success) {
      console.log("logged in the user")
      navigation.navigate("Home")
    }
  
  }, [success])
  
console.log(success)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          name= "email"
          value={loginData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          name= "password"
          value={loginData.password}
          onChangeText={(value) => handleInputChange("password", value)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
