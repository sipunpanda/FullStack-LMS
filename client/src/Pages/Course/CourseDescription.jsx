import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HomeLayout>
      {/* Wrapper */}
      <div className="min-h-[90vh] pt-12 px-6 md:px-20 flex flex-col items-center text-white">
        {/* Course Details Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 w-full max-w-5xl">
          {/* Left Section */}
          <div className="space-y-6">
            {/* Course Image */}
            <div className="relative group overflow-hidden rounded-lg">
              <img
                className="w-full h-64 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 shadow-lg"
                src={state?.thumbnail?.secure_url}
                alt="Course Thumbnail"
              />
            </div>

            {/* Course Meta Details */}
            <div className="space-y-4 text-lg">
              <div className="flex flex-wrap justify-between">
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">Total Lectures: </span>
                  {state.numbersOfLectures}
                </p>
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">Instructor: </span>
                  {state.createdBy}
                </p>
              </div>

              {/* Action Button */}
              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                <button
                  onClick={() => navigate("/course/displaylectures", { state: { ...state } })}
                  className="w-full bg-yellow-600 text-xl font-bold rounded-md px-5 py-3 hover:bg-yellow-500 transition-all duration-300 shadow-md"
                >
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-yellow-600 text-xl font-bold rounded-md px-5 py-3 hover:bg-yellow-500 transition-all duration-300 shadow-md"
                >
                  Subscribe to Course
                </button>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4 text-lg">
            <h1 className="text-3xl font-bold text-yellow-500 text-center">
              {state.title}
            </h1>
            <p className="text-yellow-500 font-bold">Course Description:</p>
            <p className="text-gray-300">{state.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
