import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';



const app = express();

app.use(express.json());

app.use(cookieParser());
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

app.use('/api/v1/user', userRoutes)

app.all('*', (req, res,next) => {
    res.status(404).json(
        {
            error: "Page Not Found..."
        }
    )
})

app.use(errorMiddleware)




export default app;