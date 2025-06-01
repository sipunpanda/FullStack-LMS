import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

import Swal from "sweetalert2";

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
    const { allPayments, monthlySalesRecord } = useSelector((state) => state.razorpay);
    const myCourses = useSelector((state) => state?.course?.courseData);

    // async function onCourseDelete(id) {
    //     if (window.confirm("Are you sure you want to delete the course?")) {
    //         const res = await dispatch(deleteCourse(id));
    //         if (res?.payload?.success) {
    //             await dispatch(getAllCourses());
    //         }
    //     }
    // }


    async function onCourseDelete(id) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#ff4d4d", // Custom Red Button
          cancelButtonColor: "#4CAF50", // Custom Green Button
          confirmButtonText: "Yes, delete it!",
          background: "#1E293B", // Dark gray background
          color: "#ffffff", // White text color
          customClass: {
            popup: "rounded-xl shadow-lg",
            title: "text-yellow-400 text-2xl font-bold", // Yellow Title
            confirmButton: "bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded",
            cancelButton: "bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded",
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await dispatch(deleteCourse(id));
            if (res?.payload?.success) {
              await dispatch(getAllCourses());
              Swal.fire({
                title: "Deleted!",
                text: "Your course has been deleted.",
                icon: "success",
                background: "#1E293B", // Keep dark theme for success
                color: "#ffffff",
              });
            }
          }
        });
      }
    

    useEffect(() => {
        (async () => {
            await dispatch(getAllCourses());
            await dispatch(getStatsData());
            await dispatch(getPaymentRecord());
        })();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-screen py-10 flex flex-col items-center bg-gray-900 text-white">
                <h1 className="text-4xl font-bold text-yellow-500 mb-10">Admin Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-11/12">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                        <div className="w-full flex justify-center">
                            <Pie data={{
                                labels: ["Registered Users", "Enrolled Users"],
                                datasets: [{
                                    label: "Users",
                                    data: [allUsersCount, subscribedCount],
                                    backgroundColor: ["#facc15", "#22c55e"],
                                    borderWidth: 1,
                borderColor: ["yellow","green"],
                                }],
                            }} />
                        </div>
                        <div className="flex justify-around mt-6">
                            <div className="text-center">
                                <FaUsers className="text-yellow-500 text-5xl" />
                                <p className="text-lg">Registered Users</p>
                                <h3 className="text-3xl font-bold">{allUsersCount}</h3>
                            </div>
                            <div className="text-center">
                                <FaUsers className="text-green-500 text-5xl" />
                                <p className="text-lg">Subscribed Users</p>
                                <h3 className="text-3xl font-bold">{subscribedCount}</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                        <div className="w-full">
                            <Bar data={{
                                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                datasets: [{
                                    label: "Sales / Month",
                                    data: monthlySalesRecord,
                                    backgroundColor: "#ef4444",
                                    borderColor: ["white"],
                                    borderWidth: 1,
                                }],
                            }} />
                        </div>
                        <div className="flex justify-around mt-6">
                            <div className="text-center">
                                <FcSalesPerformance className="text-yellow-500 text-5xl" />
                                <p className="text-lg">Subscription Count</p>
                                <h3 className="text-3xl font-bold">{allPayments?.count}</h3>
                            </div>
                            <div className="text-center">
                                <GiMoneyStack className="text-green-500 text-5xl" />
                                <p className="text-lg">Total Revenue</p>
                                <h3 className="text-3xl font-bold">${allPayments?.count * 499}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-11/12 mt-10">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-3xl font-semibold">Courses Overview</h2>
                        <button onClick={() => navigate("/course/create")} className="bg-yellow-500 hover:bg-yellow-600 text-lg font-semibold py-2 px-4 rounded-lg transition">Create New Course</button>
                    </div>
                    
                    <div className="overflow-x-auto bg-gray-800 p-5 rounded-lg shadow-lg">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-3 px-2">Sr.</th>
                                    <th className="py-3 px-2">Title</th>
                                    <th className="py-3 px-2">Category</th>
                                    <th className="py-3 px-2">Instructor</th>
                                    <th className="py-3 px-2 text-center">Lectures</th>
                                    <th className="py-3 px-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myCourses?.map((course, idx) => (
                                    <tr key={course._id} className="border-b border-gray-700">
                                        <td className="py-3 px-2">{idx + 1}</td>
                                        <td className="py-3 px-2">{course.title}</td>
                                        <td className="py-3 px-2">{course.category}</td>
                                        <td className="py-3 px-2">{course.createdBy}</td>
                                        <td className="py-3 px-2 text-center">{course.numbersOfLectures}</td>
                                        <td className="py-3 px-2 flex gap-3 justify-center">
                                            <button onClick={() => navigate("/course/displaylectures", { state: { ...course } })} className="bg-green-500 hover:bg-green-600 text-xl py-2 px-4 rounded-md transition">
                                                <BsCollectionPlayFill />
                                            </button>
                                            <button onClick={() => onCourseDelete(course._id)} className="bg-red-500 hover:bg-red-600 text-xl py-2 px-4 rounded-md transition">
                                                <BsTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AdminDashboard;
