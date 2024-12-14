import express from 'express';
import dotenv from 'dotenv';

import app from './app.js';
import connectToDB from './config/dbConnection.js';


dotenv.config();

const PORT = process.env.PORT || 8080

app.listen(PORT, async() => {
    await connectToDB();
  console.log(`Server is running on port ${PORT}`);
});




