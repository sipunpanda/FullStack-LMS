import Router from 'express';
import { getAllCourses, getLectureById } from '../controllers/course.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();


// Define routes
router.get('/', getAllCourses);
router.get('/:id',isLoggedIn, getLectureById);

export default router;