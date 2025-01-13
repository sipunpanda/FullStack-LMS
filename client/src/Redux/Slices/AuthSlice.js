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
        
        const res = axiosInstance.post('user/register', data);
        console.log("hi2",res);
        toast.promise(
            res, {
            loading: "Wait creating Your Account",
           success: (response) => {
                    console.log("Account created successfully:", response.data);
                    return response.data.message || "Account created successfully!";
                },
            error: "Could not create your account"
        }
        );
        // if(res){
        //     toast.success("Account created successfully");
        // }
        // console.log("hi3",res);

        return (await res).data;
    } catch (error) {
        // console.log("hi4",res);

        toast.error(error?.response?.data?.message)
    }
})


export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        // console.log("hi",data);
       
        
        const res =  axiosInstance.post('user/login', data);
        // console.log("hi2",res);
        await toast.promise(
            res, {
            loading: "Wait authentication in progress...",
            success: (data) => {
                // console.log("data",data);
                
                return data?.data?.message;
            },
            error: "Failed to log in"
        }
        );
        // toast.success( "Account successfully logged in");
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => { 
    // console.log("inlogout1");

    try {
        // console.log("hi");
       
        
        const res = axiosInstance.get('user/logout');
        // console.log("hi2",res);
        await toast.promise(
            res, {
            loading: "Wait authentication in progress...",
            success: (data) => {
                // console.log("data",data);
                
                return data?.data?.message;
            },
            error: "Failed to logout"
        }
        );
        // toast.success( "Account Logout successfully");
        return (await res).data;
    } catch (error) {
        // console.log("inlogout error",error);

        toast.error(error?.response?.data?.message)
    }
}
);




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:(builder) =>{
        builder
        .addCase(login.fulfilled, (state, action) =>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.data = action?.payload?.user;
            state.isLoggedIn = true;
        })
        .addCase(logout.fulfilled, (state, action) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
    })
    }
})

export const { } = authSlice.actions;
export default authSlice.reducer;