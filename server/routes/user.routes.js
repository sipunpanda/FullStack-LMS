import { Router } from "express";
import {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    updatePassword
} from '../controllers/user.controller.js'
import { isLoggedIn } from "../models/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/register',upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', isLoggedIn, logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:resetToken',resetPassword);
router.post('/update-password',isLoggedIn,updatePassword);







export default router

