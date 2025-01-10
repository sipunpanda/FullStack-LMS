import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";

function Signup(){

const [previewImage, setPreviewImage] = useState("");

    return(
      <HomeLayout >
        <div className="flex items-center justify-center h-[90vh]">
            <form className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] w-" >
                <h1 className="text-center text-2xl font-bold">
                    Registration Page
                </h1>

                <label htmlFor="image_upload" className="cursor-pointer">
                    {
                        previewImage?
                        <img src={previewImage} alt="preview" className="w-32 h-32 object-cover rounded-full m-auto" />
                        :
                        <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                    }
                </label>
                
            </form>

        </div>

      </HomeLayout>
    )
}

export default Signup;