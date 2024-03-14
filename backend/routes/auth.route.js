const express = require("express");
const router = express.Router();

// import controller
const {authRoute} = require('../controllers/auth.controller')

// route handler
router.post('/signup', authRoute);

// export
module.exports = router;