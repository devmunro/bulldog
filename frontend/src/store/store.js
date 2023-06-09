import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import exerciseReducer from '../features/exerciseSlice'
import { bodyStatSlice } from '../features/bodySlice'

export const store = configureStore({

    reducer: {
        auth: userReducer,
        fitness: exerciseReducer,
        body: bodyStatSlice
    }
})