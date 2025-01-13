import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast';
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {                                                                                                                                     

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function getImage(e) {
        e.preventDefault();
        // get Image
        const uploadedImage = e.target.files[0];

        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", () => {
                setPreviewImage(fileReader.result)
            })
        }


    }

    async function createNewAccount(e){
        e.preventDefault();
        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar){
            toast.error("All fields are required");
            return;
        }

        //check name field length
        if(signupData.fullName.length < 5){
            toast.error("Full Name should be at least 5 characters long");
            return;
        }
        if (!signupData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            toast.error("Invalid Email");
            return;
        }
        if (!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            toast.error("Invalid Password: Must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        
// send request to server
        const formData = new FormData();
        formData.append('email', signupData.email);
        formData.append('password', signupData.password);
        formData.append('fullName', signupData.fullName);
        formData.append('avatar', signupData.avatar);
        

        // dispatch action to create new user
        const response = await dispatch(createAccount(formData));
        //if i use  below line i may face issue while uploading file
        // const response = await dispatch(createAccount(signupData));
        if(response?.payload?.success) {
            navigate("/")
        }



        navigate("/") ;

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        })

        setPreviewImage("");
        
        
    }

    return (
        <HomeLayout >
            <div className="flex items-center justify-center h-[90vh]">
                <form onSubmit={createNewAccount} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] w-" >
                    <h1 className="text-center text-2xl font-bold">
                        Registration Page
                    </h1>

                    <label htmlFor="image_upload" className="cursor-pointer">
                        {
                            previewImage ?
                                <img src={previewImage} alt="preview" className="w-32 h-32 object-cover rounded-full m-auto" />
                                :
                                <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        }
                    </label>
                    <input
                        onChange={getImage}
                        type="file"
                        className="hidden"
                        name="image_upload"
                        id="image_upload"
                        accept=".jpg, .jpeg, .png, .svg" />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold"> Full Name </label>
                        <input
                            type="text"
                            placeholder="Enter Your Full Name"
                            name="fullName"
                            id="fullName"
                            required
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={setSignupData.fullName}
                        />
                    </div>
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
                            value={setSignupData.email}
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
                            value={setSignupData.password}
                        />
                    </div>

                    <button type="submit" className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer mt-1">
                        Create Account
                    </button>

                    <p className="text-center">
                        Already have an account ? <Link to="/login" className="link text-accent cursor-pointer"> Login</Link>
                    </p>
                </form>

            </div>

        </HomeLayout>
    )
}

export default Signup;