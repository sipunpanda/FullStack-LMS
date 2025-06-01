import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserData } from "../../Redux/Slices/AuthSlice.js";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice.js";
import HomeLayout from "../../Layouts/HomeLayout";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);

  // Cancel subscription handler
  const handleCourseCancelSubscription = async () => {
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
  };

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center bg-gray-900">
        <div className="my-10 flex flex-col gap-6 rounded-lg p-6 text-white w-fit shadow-lg bg-gray-800 transition-all duration-300 hover:shadow-xl">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              className="w-32 h-32 rounded-full border-4 border-yellow-500 shadow-md"
              src={userData?.avatar?.secure_url}
              alt="user profile"
            />
            <h3 className="text-2xl font-semibold mt-3 capitalize">
              {userData?.fullName}
            </h3>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-2 gap-2 text-lg">
            <p className="text-gray-400">Email :</p>
            <p className="text-yellow-400">{userData?.email}</p>

            <p className="text-gray-400">Role :</p>
            <p className="text-yellow-400 capitalize">{userData?.role}</p>

            <p className="text-gray-400">Subscription :</p>
            <p
              className={`font-semibold ${
                userData?.subscription?.status === "active"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3">
            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/user/changepassword"
              }
              className="w-1/2 bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 rounded-md py-2 font-semibold text-center shadow-md"
            >
              Change Password
            </Link>

            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/user/editprofile"
              }
              className="w-1/2 border border-yellow-500 text-yellow-500 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 rounded-md py-2 font-semibold text-center shadow-md"
            >
              Edit Profile
            </Link>
          </div>

          {/* Cancel Subscription Button */}
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCourseCancelSubscription}
              className="w-full bg-red-600 hover:bg-red-500 transition-all duration-300 rounded-md py-2 font-semibold text-center shadow-md"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;
