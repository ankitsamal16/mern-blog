const express = require("express");
const router = express.Router();

// import controller
const test = require('../controllers/user.controller')

// route handler
router.get('/test', test)

// export
module.exports = router;