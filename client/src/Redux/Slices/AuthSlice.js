import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance.js';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem("data") && localStorage.getItem("data") !== "undefined" 
    ? JSON.parse(localStorage.getItem("data")) 
    : {},    // data:   JSON.parse(localStorage.getItem('data')) || {}
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        // console.log("hi",data);
        
        const res = axiosInstance.post('user/register', data);
        // console.log("hi2",res);
        toast.promise(
            res, {
            loading: "Wait creating Your Account",
           success: (response) => {
                    // console.log("Account created successfully:", response.data);
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


export const login = createAsyncThunk("/auth/login", async (data,  { rejectWithValue }) => {
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
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});



export const logout = createAsyncThunk("/auth/logout", async () => { 
    // console.log("inlogout1");

    try {
        // console.log("hi");
       
        
        const res =  axiosInstance.get('user/logout');
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


// function to fetch user data
export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
      // console.log("hi");
      const res = await axiosInstance.get('/user/me');
      
      return res?.data;
    } catch (error) {
      toast.error(error.message);
    }
  });

  
// function to change user password
export const changePassword = createAsyncThunk(
    "/auth/changePassword",
    async (userPassword) => {
      try {
        let {userID, password} = userPassword
        let res = axiosInstance.post('/user/update-password', {password:password});
  
        await toast.promise(res, {
          loading: "Loading...",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to change password",
        });
  
        // getting response resolved here
        res = await res;
        return res.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );
  
  // function to handle forget password
  export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (email) => {
      try {
        let res = axiosInstance.post("/user/reset", { email });
  
        await toast.promise(res, {
          loading: "Loading...",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to send verification email",
        });
  
        // getting response resolved here
        res = await res;
        return res.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );
  
  // function to update user profile
  export const updateProfile = createAsyncThunk(
    "/user/update/profile",
    async (data) => {
      try {
        let res = axiosInstance.post(`/user/update-user/${data[0]}`, data[1]);
  
        toast.promise(res, {
          loading: "Updating...",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to update profile",
        });
        // getting response resolved here
        res = await res;
        return res.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );
  
  // function to reset the password
  export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
    try {
      let res = axiosInstance.post(`/user/reset/${data.resetToken}`, {
        password: data.password,
      });
  
      toast.promise(res, {
        loading: "Resetting...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to reset password",
      });
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });
  


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:(builder) =>{
        builder
        .addCase(login.fulfilled, (state, action) =>{          
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", JSON.stringify(action?.payload?.user?.role));
            state.data = action?.payload?.user;
            state.isLoggedIn = true;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state, action) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
    })
      // for user details
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  }
    
})

export const { } = authSlice.actions;
export default authSlice.reducer;
