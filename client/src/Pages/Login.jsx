import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-hot-toast';
import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }


    async function onLogin(e) {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("All fields are required");
            return;
        }

        //check name field length
        if (!loginData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            toast.error("Invalid Email");
            return;
        }
        if (!loginData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            toast.error("Invalid Password: Must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        // send request to server
        // const formData = new FormData();
        // formData.append('email', loginData.email);
        // formData.append('password', loginData.password);






        // dispatch action to create new user
        const response = await dispatch(login(loginData));
        console.log("resp", response);

        if (response?.payload?.success) {
            navigate("/")
        }



        navigate("/");

        setLoginData({
            email: "",
            password: ""
        })


    }

    return (
        <HomeLayout >
            <div className="flex items-center justify-center h-[90vh]">
                <form onSubmit={onLogin} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] w-" >
                    <h1 className="text-center text-2xl font-bold">
                        Login Page
                    </h1>

                
                  
                  
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold"> Email </label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            name="email"
                            id="email"
                            required
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={setLoginData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold"> Password </label>
                        <input
                            type="password"
                            placeholder="Create Your Password"
                            name="password"
                            id="password"
                            required
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={setLoginData.password}
                        />
                    </div>

                    <button type="submit" className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer mt-1">
                        Login Account
                    </button>

                    <p className="text-center">
                        Don't have an account ? <Link to="/signup" className="link text-accent cursor-pointer"> Signup</Link>
                    </p>
                </form>

            </div>

        </HomeLayout>
    )
}

export default Login;