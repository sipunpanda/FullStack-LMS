import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                });
            });
        }
    }
    function handleUserInput(e) {
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }
    async function onFormSubmit(e) {
        e.preventDefault();
        if(!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy) {
            toast.error("All fields are mandatory");
            return;
        }
        const response = await dispatch(createNewCourse(userInput));
        if(response?.payload?.success) {
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            });
            navigate("/courses");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen p-4">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-6 text-white w-full max-w-3xl my-10 shadow-lg relative"
                >
                      <div className="flex items-center justify-between mb-6">
                                <button onClick={() => navigate(-1)} className="text-2xl text-green-500">
                                  <AiOutlineArrowLeft />
                                </button>
                                <h1 className="text-xl font-semibold text-yellow-500">Create New Course</h1>
                              </div>
                    <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {userInput.previewImage ? (
                                        <img className="w-full h-44 object-cover border" src={userInput.previewImage} />
                                    ) : (
                                        <div className="w-full h-44 flex items-center justify-center border">
                                            <h1 className="font-bold text-lg text-center">Upload your course thumbnail</h1>
                                        </div>
                                    )}
                                </label>
                                <input 
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    accept=".jpg, .jpeg, .png"
                                    name="image_uploads"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="title">Course title</label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter course title"
                                    className="bg-transparent px-3 py-2 border rounded-md w-full"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="createdBy">Course Instructor</label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter course instructor"
                                    className="bg-transparent px-3 py-2 border rounded-md w-full"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="category">Course category</label>
                                <input
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Enter course category"
                                    className="bg-transparent px-3 py-2 border rounded-md w-full"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="description">Course description</label>
                                <textarea
                                    required
                                    name="description"
                                    id="description"
                                    placeholder="Enter course description"
                                    className="bg-transparent px-3 py-2 border rounded-md h-24 resize-none w-full"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>
                    <button type="submit" className="w-full py-3 rounded-md font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateCourse;