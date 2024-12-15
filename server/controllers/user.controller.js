import User from '../models/user.model.js'
import AppError from '../utils/appError.js'


const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
}


const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;
  


    if (!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400))
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new AppError('Email already in use', 400))
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/your_cloud_name/image/upload/v1674647316/avatar_drzgxv.jpg', // replace with your cloudinary url
        }
    });
    if (!user) {
        return next(new AppError('Failed to create user', 500))

    }
    user.password = undefined;

    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user
    })


};

const login = async (req, res, next) => {
    console.log("login successful");

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new AppError('Email and password are required', 400))
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user || !user.comparePassword(password)) {
            return next(new AppError('Invalid email or password', 401))
        }

        user.password = undefined;
        

        const token = await user.generateJWTToken();
        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user
        })
    } catch (error) {
        return next(new AppError(error.message, 500))
    }






};

const logout = (req, res, next) => {
    res.cookie("token", null, { maxAge: 0, secure: true, httpOnly: true });
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })

};

const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await  User.findById(userId);
    
        if (!user) {
            return next(new AppError('User not found', 404))
        }
        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            user
        })
    } catch (error) {
        return next(new AppError("Failed to fetch User profile", 500))
        
    }


};

export {
    register,
    login,
    logout,
    getProfile
}
