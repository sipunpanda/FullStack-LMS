import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../Assets/Images/aboutMainImage.png";

import CarouselSlide from "../Components/CarouselSlide.jsx"

import {
    celebrities
} from "../Constants/CelebrityData.js"

function AboutUs() {

        return (
            <HomeLayout>
                <div className="px-4 pt-20 flex flex-col text-white md:px-10 lg:px-20">
                    <div className="flex flex-col md:flex-row items-center gap-5 mx-4 md:mx-10">
                        <section className="w-full md:w-1/2 space-y-6 md:space-y-10">
                            <h1 className="text-3xl md:text-5xl text-yellow-500 font-semibold">
                                Affordable and quality education
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200">
                                Our goal is to provide affordable and quality education to the world.
                                We are dedicated to providing excellent quality training for students to improve their performance
                                and to make them successful in their careers.
                            </p>
                        </section>
                        <div className="w-full md:w-1/2">
                            <img
                                src={aboutMainImage}
                                alt="about us image"
                                className="drop-shadow-2xl w-full max-w-md md:max-w-lg"
                            />
                        </div>
                    </div>

                    <div className="carousel w-full md:w-3/4 my-16 mx-auto">
                        {
                            celebrities?.map((celebrity, index) => (
                                <CarouselSlide
                                    {...celebrity}
                                    key={celebrity.slideNumber || index}
                                    totalSlides={celebrities.length}
                                />
                            ))
                        }
                    </div>
                </div>
            </HomeLayout>
        )
    }

export default AboutUs;
