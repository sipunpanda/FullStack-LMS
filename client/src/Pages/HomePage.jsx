import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import HomeImage from "../Assets/Images/homePageMainImage.png";
function Homepage(){
    return(
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
                <div className="w-1/2 space-y-6 ">
                <h1 className="text-5xl font-semibold text-gray-700 dark:text-white">
                    Find out best
                    <span className="text-yellow-500 font-bold">
                        Online Courses
                    </span>
                </h1>
                <p className="text-xl text-gray-400">
                    Lorem ipsum dolor dolores temporibus voluptatum quo deserunt odio ipsam cupiditate invent

                </p>
                <div className="space-x-6">
                    
                    <Link to="/courses"  >
                    <button className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 border-0 rounded-md font-semibold cursore-pointer text-xl">
                        Explore Courses
                    </button>
                    </Link>

                    <Link to="/contact"  >
                    <button className="px-4 py-2 text-white hover:bg-yellow-600 border border-yellow-500 rounded-md font-semibold cursore-pointer text-xl">
                        Contact Us
                    </button>
                    </Link>

                </div>

                </div>

                <div className="w-1/2 flex item-center justify-center">
                    <img src={HomeImage} alt="homepage image" />
                </div>

            </div>
        </HomeLayout>
    )
}

export default Homepage;