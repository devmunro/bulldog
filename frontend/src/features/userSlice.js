import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const userSlice = createSlice({
   
 
    name: 'user',
    initialState: [],
})

export default userSlice.reducer;