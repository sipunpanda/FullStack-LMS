import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';

import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'



const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true })); // eslint-disable-line no-unused-vars global variable names and types //

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
}));

app.use(morgan('dev'));




app.use('/ping', (req, res) => {
    res.status(200).json(
        {
            data: "Server is Active"
        }
    )
})

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);

app.all('*', (req, res,next) => {
    res.status(404).json(
        {
            error: "Page Not Found..."
        }
    )
})

app.use(errorMiddleware)




export default app;