import { Router } from "express";
import {
    register,
    login,
    logout,
    getProfile
} from '../controllers/user.controller.js'
import { isLoggedIn } from "../models/auth.middleware.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isLoggedIn, logout);
router.get('/me', isLoggedIn, getProfile);







export default router

