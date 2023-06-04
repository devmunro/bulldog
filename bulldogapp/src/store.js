import {configureStore} from '@reduxjs/toolkit';
import exerciseReducer from './features/exerciseSlice';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    auth: userReducer,
    fitness: exerciseReducer
  },
});

export default store;
