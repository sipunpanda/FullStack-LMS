import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance.js';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        console.log("hi",data);
       
        
        const res = await axiosInstance.post('user/register', data);
        // console.log("hi2",res);
        // await toast.promise(
        //     res, {
        //     loading: "Wait creating Your Account",
        //     success: (data) => {
        //         console.log("data",data);
                
        //         return data?.data?.message;
        //     },
        //     error: "Could not create your account"
        // }
        // );
        toast.success( "Your account has been created");
        return res.data;
    } catch (error) {
        toast.error("end ho gaya")
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

export const { } = authSlice.actions;
export default authSlice.reducer;