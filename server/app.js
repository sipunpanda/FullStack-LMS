import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';


const app = express();

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


app.all('*', (req, res) => {
    res.status(404).json(
        {
            error: "Page Not Found"
        }
    )
})




export default app;