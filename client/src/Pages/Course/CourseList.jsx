import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect } from "react";
import CourseCard from "../../Components/CourseCard";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-16 px-4 md:px-10 lg:px-20 flex flex-col items-center text-white">
                {/* Heading */}
                <h1 className="text-2xl md:text-3xl text-center font-semibold mb-5">
                    Explore the Courses made by{" "}
                    <span className="font-bold text-yellow-500">Industry Experts</span>
                </h1>

                {/* Centered Course Grid */}
                <div className="w-full max-w-7xl flex justify-center mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                        {courseData?.map((element) => (
                            <CourseCard key={element._id} data={element} />
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;
