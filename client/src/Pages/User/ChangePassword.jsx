import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../Redux/Slices/AuthSlice";

const ChangePassword = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
    userID: useSelector((state) => state?.auth?.data?._id),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordInput({
      ...passwordInput,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { password, confirmPassword } = passwordInput;

    if (!password || !confirmPassword) {
      toast.error("Both fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            toast.error("Invalid Password: Must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }


        const response = await dispatch(changePassword(passwordInput));
        console.log("resp", response);

        if (response?.payload?.success) {
            navigate("/")
        }

    
if (response.meta.requestStatus === "fulfilled") {
    // fetching the updated user data

        // TODO: Make API call or dispatch Redux action to change password
    toast.success("Password changed successfully");
}

    setPasswordInput({
      password: "",
      confirmPassword: ""
    });

    navigate("/user/profile");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 h-[24rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Change Password</h1>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="password">
              New Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter new password"
              className="bg-transparent px-2 py-1 border"
              value={passwordInput.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Re-enter new password"
              className="bg-transparent px-2 py-1 border"
              value={passwordInput.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <Link to={"/user/profile"}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Back to Profile
            </p>
          </Link>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ChangePassword;
