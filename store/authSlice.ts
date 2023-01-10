import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import axios from "axios"

const API = process.env.localhost

// Type for our state
export interface AuthState {
  authState: boolean; 
}

// Initial state
const initialState: AuthState = {
  authState: false,
};

export const authAction = async (payload:any) =>{
  return await axios.post(`http://localhost:5000/user/login`, payload,{
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5000",
      "Content-Type": "application/json",
    }
  })
  .then(res => res) 
  .catch(err => err)
}

export const checkLogin = async () => {
  return await axios.get(`http://localhost:5000/user/isLogin`,{
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5000",
    }
  })
  .then(res => res)
  .catch(err => err)
}

export const getUser = async () => {
  return await axios.get(`http://localhost:5000/user/getUser`,{
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5000",
    }
  })
  .then(res => res)
  .catch(err => err)
}

export const logOut = async () =>{
  return await axios.get(`http://localhost:5000/user/logout`,{
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5000",
    }
  })
  .then(res => res)
  .catch(err => err)
}

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export default authSlice.reducer;