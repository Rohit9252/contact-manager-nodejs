const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc regier a user
//@route  Post /api/user/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400);
        throw new Error("Please enter all fields")
    }
    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        return res.status(400);
        throw new Error("User already exists")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const user = await User.create({
        username,
        email,
        password: hashPassword
    });

    console.log(user);

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }
});


//@desc login user
//@route  Post /api/user/register
//@access Public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400);
        throw new Error("Please enter all fields")
    };

    const user = await User.findOne({ email });


    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user._id
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }   )
        res.status(200).json({
            accessToken
        });
    }else{
        res.status(401);
        throw new Error("Invalid email or password")
    }
});

//@desc get current user
//@route  Post /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});



module.exports = {
    registerUser,
    loginUser,
    currentUser
}
