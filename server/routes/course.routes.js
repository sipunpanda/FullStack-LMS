import Router from 'express';
import { addLectureToCourseById, createCourse, deleteCourse, deleteLectureFromCourseById, getAllCourses, getLectureById, updateCourse } from '../controllers/course.controller.js';
import { authorizedRole, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js'

const router = Router();


// Define routes
router.get('/', getAllCourses)
    .post('/', isLoggedIn,  authorizedRole('ADMIN'),upload.single('thumbnail'), createCourse);

router.get('/:id', isLoggedIn, authorizedRole('ADMIN'), getLectureById)
    .put('/:id', isLoggedIn, authorizedRole('ADMIN'), updateCourse)
    .delete('/:id', isLoggedIn, authorizedRole('ADMIN'), deleteCourse)
    .post('/:id', isLoggedIn, authorizedRole('ADMIN'), upload.single('lectureThumbnail'),addLectureToCourseById )

    .delete('/:id/lectures/:lectureId', isLoggedIn, authorizedRole('ADMIN'), deleteLectureFromCourseById);


export default router;