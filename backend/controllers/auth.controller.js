const jwt = require('jsonwebtoken');
// import model ->
const User = require('../models/user.model');

// import bcyptjs to hash the passwords -->
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');

// Controller logic -->
exports.signup = async(req, res, next) => {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password || username === '' || email === '' || password === ''){
            next(errorHandler(400, 'All fields are required'));
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
            next(error);
        }
    }
    catch(err){
        console.log("error in auth");
    }
}

exports.signin = async(req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required.'));
    }

    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            next(errorHandler(404, 'User not found'));
        }
        // comparing passwords 
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400, 'Invalid Password'));
        }

        // authenticate the users
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET)
        const { password:pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);
    }
    catch(error){
        next(error);
    }
}

exports.google = async (req, res, next) => {
    const {email, name, googlePhotoUrl} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
        else{
            const generatePassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res
               .status(200)
               .cookie('access_token', token, {
                   httpOnly: true,
               })
               .json(rest);
        }
    }
    catch(error){
        next(error);
    }
}