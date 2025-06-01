import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteCourseLecture, getCourseLecture } from "../../Redux/Slices/LectureSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import VideoPlayer from "../../Components/VideoPlayer";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting course details from the previous page
  const courseDetails = useLocation().state;
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  // Video state to track the current playing lecture
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Function to delete lecture
  const handleLectureDelete = async (courseId, lectureId) => {
    await dispatch(deleteCourseLecture({ courseId, lectureId }));
    await dispatch(getCourseLecture(courseDetails._id));
  };

  // Fetching the course lecture data
  useEffect(() => {
    dispatch(getCourseLecture(courseDetails._id));
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white px-4 md:px-10">
        {/* Course Title */}
        <h1 className="text-center text-3xl font-bold text-yellow-500">
          {courseDetails?.title}
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-10 w-full max-w-5xl">
          {/* Left Section - Video Player */}
          <div className="w-full md:w-[60%] p-4 rounded-lg shadow-lg bg-zinc-800">
            <div className="relative group overflow-hidden rounded-lg">
              {/* <video
                className="object-fill rounded-lg w-full shadow-md transition-all duration-300 group-hover:shadow-xl"
                src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video> */}
              <VideoPlayer lectures={lectures} currentVideoIndex={currentVideoIndex} />
            </div>
            <div className="mt-4 space-y-2 text-lg">
              <h1>
                <span className="text-yellow-500 font-bold">Title: </span>
                {lectures && lectures[currentVideoIndex]?.title}
              </h1>
              <p>
                <span className="text-yellow-500 font-bold">Description: </span>
                {lectures && lectures[currentVideoIndex]?.description}
              </p>
            </div>
          </div>

          {/* Right Section - Lecture List */}
          <div className="w-full md:w-[40%] p-4 rounded-lg shadow-lg bg-zinc-800">
            <div className="flex items-center justify-between text-xl text-yellow-500 font-semibold mb-4">
              <p>Lectures List</p>
              {role === "ADMIN" && (
                <button
                  onClick={() => navigate("/course/addlecture", { state: { ...courseDetails } })}
                  className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-400 transition-all font-semibold text-white text-sm shadow-md"
                >
                  + Add Lecture
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {lectures &&
                lectures.map((element, index) => (
                  <li
                    key={element._id}
                    className="p-2 rounded-md hover:bg-zinc-700 transition-all cursor-pointer"
                    onClick={() => setCurrentVideoIndex(index)}
                  >
                    <span className="text-yellow-500 font-semibold">
                      Lecture {index + 1}:
                    </span>{" "}
                    {element?.title}
                    {role === "ADMIN" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLectureDelete(courseDetails?._id, element?._id);
                        }}
                        className="ml-3 px-2 py-1 rounded-md text-sm font-semibold bg-red-500 hover:bg-red-400 transition-all shadow-md"
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
