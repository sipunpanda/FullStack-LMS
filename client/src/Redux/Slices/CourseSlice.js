import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState ={
    courseData: []

}

export const getAllCourses = createAsyncThunk("/course/get", async ()=>{
    try{
        const response = axiosInstance.get("/course");
        await toast.promise(
            response, {
            loading: "Loading courses...",
            success: "Courses retrieved successfully",
            error: (error) => {
                console.log(error);
                throw new Error("Failed to load courses");
            }
        }
        )
        return (await response).data.courses;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
 });

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getAllCourses.fulfilled, (state, action)=>{
            if(action.payload){
                state.courseData = [...action.payload]
            }
        })
    }
});

export default courseSlice.reducer;