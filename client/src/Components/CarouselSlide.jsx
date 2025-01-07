function CarouselSlide({image, title, description, slideNumber, totalSlides}) {
    return (
        <>
            <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
                <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                    <img
                        src={image}
                        className="w-40 rounded-full border-2 border-gray-400"
                    />
                    <p className="text-xl text-gray-200 text-center">
                        {description}
                    </p>
                    <h3 className="text-2xl text-white font-semibold">{title}</h3>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between ">
                        <a href={`#slide${slideNumber == 1 ? totalSlides : slideNumber - 1}`} className="btn btn-circle">❮</a>
                        <a href={`#slide${slideNumber == totalSlides ? 1 : slideNumber +1 }`} className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarouselSlide;