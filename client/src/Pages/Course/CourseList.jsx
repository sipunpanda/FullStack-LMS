import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect } from "react";
import CourseCard from "../../Components/CourseCard";

function CourseList(){
const dispatch = useDispatch();

const {courseData} = useSelector((state) => state.course);

console.log("courseData", courseData);


async function loadCourses(){
    await dispatch(getAllCourses());

}

useEffect(() => {
    loadCourses();
}, []);
    return(
        <>
        <HomeLayout>
            <div className="min-h-[90vh] pt-20 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-3xl text-center font-semibold mb-5">
                    Explore the Courses made by
                    <span className="font-bold text-yellow-500">
                        Industry Exports
                    </span>
                        </h1>
                    <div className="mb-10 flex flex-wrap gap-14">
                        {
                            courseData?.map((element)=>{
                                return <CourseCard key={element._id} data={element} />
                            })
                        }
                    </div>
            </div>
        </HomeLayout>
        </>
    )
}

export default CourseList;