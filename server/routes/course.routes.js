import Router from 'express';
import { createCourse, deleteCourse, getAllCourses, getLectureById, updateCourse } from '../controllers/course.controller.js';
import { authorizedRole, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js'

const router = Router();


// Define routes
router.get('/', getAllCourses)
    .post('/', isLoggedIn, upload.single('thumbnail'), authorizedRole('ADMIN'), createCourse);

router.get('/:id', isLoggedIn, authorizedRole('ADMIN'), getLectureById)
    .put('/:id', isLoggedIn, authorizedRole('ADMIN'), updateCourse)
    .delete('/:id', isLoggedIn, authorizedRole('ADMIN'), deleteCourse);


export default router;