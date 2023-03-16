const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//@desc regier a user
//@route  Post /api/user/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    // if (!username || !email || !password) {
    //     return res.status(400);
    //     throw new Error("Please enter all fields")
    // }
    const userAvailable = await User.findOne({ email });

    if (userAvailable?.email) {
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

     if(user){
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
     }else{
            res.status(400);
            throw new Error("Invalid user data")
     }
});


//@desc login user
//@route  Post /api/user/register
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "login  route" })
});

//@desc get current user
//@route  Post /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "current user information " })
});



module.exports = {
    registerUser,
    loginUser,
    currentUser
}
