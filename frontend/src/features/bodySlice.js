import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



//API LINK // main url
const API_URL = process.env.REACT_APP_API_BASE_URL;


// getbodyweight
export const getBodyWeight = createAsyncThunk(
    "body/fetchBodyWeight",
  
    async (user) => {
      try {
        const response = await axios.get(`${API_URL}bodyStats?userID=${user}`);
  
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );


  export const bodyStatSlice = createSlice({
    name: "body",
    initialState: {
      
    },
  
    reducers: {
     
    },
   
  });
  
  
  export default bodyStatSlice.reducer;
  