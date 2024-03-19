const express = require("express");
const router = express.Router();

// import controller
const {signup} = require('../controllers/auth.controller');
const {signin} = require('../controllers/auth.controller');

// route handler
router.post('/signup', signup);
router.post('/signin', signin);

// export
module.exports = router;