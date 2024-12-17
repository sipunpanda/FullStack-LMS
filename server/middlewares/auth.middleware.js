import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) =>{
    const {token} = req.cookies;

    if(!token) return next(new AppError("Invalid token provided to login request Please Log In... "))

        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

        if(!userDetails){
            return next(new AppError("Please LogIn", 500));
        }

        req.user = userDetails ;

        next();

}


const authorizedRole = (...roles)=> async(req,res,next)=>{
    const currentUserRole = req.user.role;
    if(!roles.includes(currentUserRole)){
        return next(new AppError("You do not have permission to access this route", 500));
    }
    next();

}

export {
    isLoggedIn,
    authorizedRole
}