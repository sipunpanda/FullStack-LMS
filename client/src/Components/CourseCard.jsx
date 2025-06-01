import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/courses/description", { state: { ...data } })}
            className="w-[22rem] h-[460px] bg-zinc-800 shadow-lg rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden border border-gray-700 hover:border-yellow-500"
        >
            {/* Hover Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

            {/* Course Thumbnail */}
            <div className="relative overflow-hidden rounded-t-xl">
                <img 
                    className="h-48 w-full object-cover transition-transform duration-500 hover:scale-110" 
                    src={data?.thumbnail?.secure_url} 
                    alt="course-thumbnail" 
                />
            </div>

            {/* Course Details */}
            <div className="p-4 text-white space-y-3">
                {/* Course Title */}
                <h2 className="text-lg font-bold text-yellow-500 truncate">{data?.title}</h2>

                {/* Description */}
                <p className="text-gray-300 text-sm line-clamp-2">{data?.description}</p>

                {/* Category & Instructor */}
                <div className="flex flex-col gap-1 text-sm">
                    <p className="font-semibold">
                        <span className="text-yellow-500">Category:</span> {data?.category}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500">Instructor:</span> {data?.createdBy}
                    </p>
                </div>
            </div>

            {/* Floating Button on Hover */}
            <div className="absolute bottom-4 right-4 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-400 transition-all">
                    View Course
                </button>
            </div>
        </div>
    );
}

export default CourseCard;
