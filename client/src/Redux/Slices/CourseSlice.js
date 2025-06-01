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
                // console.log(error);
                throw new Error("Failed to load courses");
            }
        }
        )
        return (await response).data.courses;
    }catch(error){
        toast.error((error?.response?.data?.message) || "Please Login" );
    }
 });



 
// function to create a new course
export const createNewCourse = createAsyncThunk(
    "/get/course",
    async (data) => {
      // creating the form data from user data
      
      try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);
        const res = axiosInstance.post("/course", formData);
  
       await toast.promise(res, {
          loading: "Creating the course...",
          success: "Course created successfully",
          error: "Failed to create course",
        });
  
        const response = await res;
        
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );
  
  // function to delete the course
  export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
      const res = axiosInstance.delete(`course/${id}`);
  
      toast.promise(res, {
        loading: "Deleting the course...",
        success: "Courses deleted successfully",
        error: "Failed to delete course",
      });
  
      const response = await res;
  
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });
  
  // function to update the course details
  export const updateCourse = createAsyncThunk("/course/update", async (data) => {
    try {
      // creating the form data from user data
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("createdBy", data.createdBy);
      formData.append("description", data.description);
      // backend is not allowing change of thumbnail
      // if (data.thumbnail) {
      //   formData.append("thumbnail", data.thumbnail);
      // }
  
      const res = axiosInstance.put(`/course/${data.id}`, {
        title: data.title,
        category: data.category,
        createdBy: data.createdBy,
        description: data.description,
      });
  
      toast.promise(res, {
        loading: "Updating the course...",
        success: "Course updated successfully",
        error: "Failed to update course",
      });
  
      const response = await res;
      return response.data;
    } catch (error) {
      console.log(error);
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