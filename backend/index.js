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
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})