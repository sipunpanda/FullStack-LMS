import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) =>{
    const {token} = req.cookies;

    if(!token) return next(new AppError())

        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = userDetails ;

        next();

}

export {
    isLoggedIn
}