const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log("MongoDB is connected");
})
.catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// create a api -> 

const userRouter = require('./routes/user.route');
app.use('/api/user', userRouter);
const authRouter = require('./routes/auth.route');
app.use('/api/auth', authRouter);



// middleware and function to handle errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error, Try After Sometime';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})