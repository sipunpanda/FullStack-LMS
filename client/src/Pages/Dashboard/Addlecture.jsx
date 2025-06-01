import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import HomeLayout from "../../Layouts/HomeLayout";

const AddLecture = () => {
  const courseDetails = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  // Input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  // Video upload handler
  const handleVideoUpload = (event) => {
    const video = event.target.files[0];
    if (video) {
      const source = URL.createObjectURL(video);
      setUserInput((prev) => ({
        ...prev,
        videoSrc: source,
        lecture: video,
      }));
    }
  };

  // Remove video handler
  const handleRemoveVideo = () => {
    setUserInput((prev) => ({
      ...prev,
      videoSrc: "",
      lecture: undefined,
    }));
  };

  // Form submission handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }

    const res = await dispatch(addCourseLecture(userInput));
    if (res?.payload?.success) {
      toast.success("Lecture added successfully!");
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  };

  useEffect(() => {
    if (!courseDetails) navigate(-1);
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-6">
        <div className="w-full max-w-lg p-6 bg-zinc-800 text-white shadow-lg rounded-lg">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="text-2xl text-green-500">
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl font-semibold text-yellow-500">Add New Lecture</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={userInput.title}
              onChange={handleInputChange}
              placeholder="Lecture Title"
              className="px-3 py-2 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <textarea
              name="description"
              value={userInput.description}
              onChange={handleInputChange}
              placeholder="Lecture Description"
              className="px-3 py-2 h-24 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
            />

            {/* Video Upload Section */}
            {userInput.videoSrc ? (
              <div className="relative">
                <video
                  src={userInput.videoSrc}
                  muted
                  controls
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture
                  className="w-full rounded-md shadow-md"
                ></video>
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  className="absolute top-2 right-2 bg-red-500 px-2 py-1 text-white rounded-md text-sm hover:bg-red-600 transition"
                >
                  Remove Video
                </button>
                <label className="block mt-3 text-center cursor-pointer text-blue-400 hover:text-blue-300">
                  Change Video
                  <input
                    type="file"
                    name="lecture"
                    onChange={handleVideoUpload}
                    accept="video/mp4,video/x-m4v,video/*"
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label className="h-48 border flex flex-col items-center justify-center cursor-pointer rounded-md hover:bg-zinc-700 transition-all">
                <span className="font-semibold text-lg">Choose a Video</span>
                <input
                  type="file"
                  name="lecture"
                  onChange={handleVideoUpload}
                  accept="video/mp4,video/x-m4v,video/*"
                  className="hidden"
                />
              </label>
            )}

            <button
              type="submit"
              className="w-full py-2 font-semibold text-lg bg-blue-500 rounded-md hover:bg-blue-400 transition-all"
            >
              Add Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AddLecture;
