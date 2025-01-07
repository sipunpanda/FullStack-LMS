import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../Assets/Images/aboutMainImage.png";

import CarouselSlide from "../Components/CarouselSlide.jsx"

import {
    celebrities
} from "../Constants/CelebrityData.js"

function AboutUs() {

        return (
            <HomeLayout>
                <div className="pl-20 pt-20 flex flex-col text-white ">
                    <div className="flex items-center gap-5 mx-10">
                        <section className="w-1/2 space-y-10">
                            <h1 className="text-5xl text-yellow-500 font-semibold">
                                Affordable and quality education
                            </h1>
                            <p className="text-xl text-gray-200">
                                Our goal is to provide affordable and quality education to the world.
                                We are dedicated to providing excellent quality training for students to improve their performance
                                and to make them successful in their careers.

                            </p>
                        </section>
                        <div className="w-1/2">
                            <img
                                src={aboutMainImage}
                                alt="about us image"
                                style={{
                                    filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
                                }}
                                className="drop-shadow-2xl"
                                id="test1"

                            />
                        </div>
                    </div>

                    <div className="carousel w-1/2 my-16 m-auto">


                        {
                            celebrities?.map((celebrity, index) => (
                                <CarouselSlide
                                    {...celebrity}
                                    key={celebrity.slideNumber || index}
                                    totalSlides={celebrities.length}
                                />
                            ))
                        }


                        {/*    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img
                                src={billGates}
                                className="w-40 rounded-full border-2 border-gray-400"
                            />
                            <p className="text-xl text-gray-200 text-center">
                                It's fine to celebrate success, but it is more important to heed the lessons of failure
                            </p>
                            <h3 className="text-2xl text-white font-semibold">Bill Gates</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between ">
                                <a href="#slide4" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">

                            <img
                                src={apj}
                                className="w-40 rounded-full border-2 border-gray-400"
                            />
                            <p className="text-xl text-gray-200 text-center">

                                Just one small positive thought in the morning can change your whole day

                            </p>

                            <h3 className="text-2xl text-white font-semibold">APJ Abdul Kalam</h3>

                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">

                            <img
                                src={einstein}
                                className="w-40 rounded-full border-2 border-gray-400"
                            />
                            <p className="text-xl text-gray-200 text-center">

                                The more I learn, the more I realize how much I don't know

                            </p>

                            <h3 className="text-2xl text-white font-semibold">Albert Einstein</h3>

                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">

                            <img
                                src={nelsonMandela}
                                className="w-40 rounded-full border-2 border-gray-400"
                            />
                            <p className="text-xl text-gray-200 text-center">

                                Do not judge me by my successes, judge me by how many times I fell down and got back up again
                            </p>

                            <h3 className="text-2xl text-white font-semibold">Nelson Mondela</h3>

                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div> */}


                    </div>


                </div>
            </HomeLayout>
        )
    }

export default AboutUs;