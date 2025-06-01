import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../..//Helpers/axiosInstance";

const initialState = {
  lectures: [],
};

// function to get all the lectures
export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  async (courseId) => {
    try {
      const res = axiosInstance.get(`/course/${courseId}`);

      toast.promise(res, {
        loading: "Fetching the lectures...",
        success: "Lectures fetched successfully",
        error: "Failed to fetch lectures",
      });

      const response = await res;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to add new lecture to the course
export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    
    try {
      let formData = new FormData();
      formData.append("lectureThumbnail", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);
      
      const res =  axiosInstance.post(`/course/${data.id}`, formData);

      await toast.promise(res, {
        loading: "Adding the lecture...",
        success: "Lecture added successfully",
        error: "Failed to add lecture",
      });

      const response = await res;

      return response.data;
    } catch (error) {
      
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to delete the lecture from the course
export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const res = axiosInstance.delete(
        `/course/${data.courseId}/lectures/${data.lectureId}`
      );

      await toast.promise(res, {
        loading: "Deleting the lecture...",
        success: "Lecture deleted successfully",
        error: "Failed to delete lecture",
      });

      const response = await res;
      return response.data;
    } catch (error) {
      
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export const {} = lectureSlice.actions;
export default lectureSlice.reducer;
