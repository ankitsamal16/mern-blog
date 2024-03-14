// import model ->
const User = require('../models/user.model');

// import bcyptjs to hash the passwords->
const bcryptjs = require('bcryptjs');

// Controller logic -->
exports.authRoute = async(req, res) => {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password || username === '' || email === '' || password === ''){
            return res.status(400).json({
                message:"All Fields are Required"
            });
        }

        // using bcryptjs to hash passwords here and passing it in new user... we keep the username and email same but hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username:username,
            email:email,
            password:hashedPassword
        });

        try{
            await newUser.save();
            res.json({message: 'Signup successful'});
        }
        catch(error){
            res.status(500).json({message:error.message})
        }
    }
    catch(err){
        console.log("error in auth");
    }
}