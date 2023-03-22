import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import LoginForm from './src/login';
import Home from './src/home';
import AuthNavigate from './src/Navigate/authNavigate';

export default App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigate />
      </NavigationContainer>
    </Provider>
  );
};
