const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./routes/user.route')
const authRoutes = require('./routes/auth.route')
const postRoutes = require('./routes/post.route')
const commentRoutes = require('./routes/comment.route')
const cookieParser = require('cookie-parser')
const path = require('path');

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
app.use(cookieParser());

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// create a api -> 

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


// middleware and function to handle errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});