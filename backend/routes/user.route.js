const express = require("express");
const router = express.Router();

// import controller
const { test, deleteUser, getUser, getUsers, signout, updateUser }= require('../controllers/user.controller')
const {verifyToken} = require('../utils/verifyUser')

// route handler
router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

// export
module.exports = router;