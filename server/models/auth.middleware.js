import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) =>{
    const {token} = req.cookies;

    if(!token) return next(new AppError("Invalid token provided to login request "))

        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

        if(!userDetails){
            return next(new AppError("Please LogIn", 500));
        }

        req.user = userDetails ;

        next();

}

export {
    isLoggedIn
}