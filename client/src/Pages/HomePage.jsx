import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import HomeImage from "../Assets/Images/homePageMainImage.png";
// import HomeImage from "../Assets/Images/hero4.webp";

function Homepage() {
    return (
        <HomeLayout>
            <div className="pt-10 text-white flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-16 h-auto md:h-screen">
                <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-semibold text-gray-700 dark:text-white leading-tight">
                        Find out the best
                        <span className="text-yellow-500 font-bold"> Online Courses</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-md mx-auto md:mx-0">
                        Explore a variety of online courses designed to enhance your skills and knowledge.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:mb-4 gap-4 items-center justify-center md:justify-start">
                        <Link to="/courses">
                            <button className="px-5 py-3 text-white bg-yellow-500 hover:bg-yellow-600 border-0 rounded-xl font-semibold text-lg md:text-xl w-full sm:w-auto shadow-lg transition-all">
                                Explore Courses
                            </button>
                        </Link>

                        <Link to="/contact">
                            <button className="px-5 py-3  text-yellow-500 border border-yellow-500 hover:bg-yellow-600 hover:text-white rounded-xl font-semibold text-lg md:text-xl w-full sm:w-auto shadow-lg transition-all">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <img src={HomeImage} alt="homepage image" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" />
                </div>
            </div>
        </HomeLayout>
    );
}

export default Homepage;
