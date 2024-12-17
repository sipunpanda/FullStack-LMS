import Course from "../models/course.model.js"
import AppError from "../utils/appError.js"


const getAllCourses = async (req, res, next) => {
    try {    
    const courses = await Course.find({}).select('-lectures')

    if(!courses){
        return next(new AppError("No courses found", 404))  // If no courses are found, throw an error with status 404. 404 means not found. 400 means bad request. 401 means unauthorized. 403 means forbidden. 404 means not found. 410 means gone. 500 means server error.
    }
    
    
    res.status(200).json({
        success: true,
        message: "All courses",
        courses
     
    })
    } catch (e) {
        return next(new AppError("Unable to Fetch all courses", 400))
    }

}
const getLectureById = async (req, res, next) => {
try {
    const {id} = req.params;
    

    const course = await Course.findById(id);

    if(!course){
        return next(new AppError("Course not found", 404))
    }
    res.status(200).json({
        success: true,
        message: "Course lectures",
        lectures: course.lectures
    })
    
} catch (e) {
    return next(new AppError("Unable to fetch course lectures", 400))
    
}
}


export {
    getAllCourses,
    getLectureById
}