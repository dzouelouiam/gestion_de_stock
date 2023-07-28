const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

// Register User
const registerUser = asyncHandler( async(req,res) => {
    const{name, email, password} = req.body;

    //validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill in all required fields");
    }
    if(password.length <6 ){
        res.status(400);
        throw new Error("Password must be up to 6 characters");
    }
//check if user email already exists
     const userExists = await User.findOne({ email });

     if(userExists){
        res.status(400);
        throw new Error("Email already registred");
     }

// Encrypt password before saving to DB 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


// create new user
     const user = await User.create({
        name,
        email,
        password: hashedPassword,
     });
// Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path:"/",
        httpOnly:true,
        expires: new Date(Date.now() + 1000* 86400), // 1day
        sameSite :"none",
        secure: true,
    });

     if(user){
        const{_id, name, email, photo, phone, bio }= user;
        //201 mean that a new user creation
        res.status(201).json({
            _id, name, email, photo, phone, bio,token,
        });
     }else {
        res.status(400);
        throw new Error("Invalid user data");
     }

});

// Login User
const loginUser = asyncHandler( async (req, res)=>{
    const {email,password}= req.body;

    //validate Request
    if(!email || !password){
        res.status(400);
        throw new Error("Please provide email and password");
    }
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("User not found, please signup");
      }
    // Check if the provided password matches the stored hashed password
    const passwordIsCorrext = await bcrypt.compare(password, user.password);
    // Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path:"/",
        httpOnly:true,
        expires: new Date(Date.now() + 1000* 86400), // 1day
        sameSite :"none",
        secure: true,
    });

    if (user && passwordIsCorrext) {
        const{_id, name, email, photo, phone, bio }= user;
        res.status(200).json({
            _id, name, email, photo, phone, bio,token
        });
    } else{
        res.status(405);
        throw new Error("Invalid email or password");
    }
});
// Logout User 
const logout = asyncHandler(async (req,res) => {
 res.cookie("token","",{
    path:"/",
    httpOnly:true,
    expires: new Date(0), 
    sameSite :"none",
    secure: true,
 });
 return res.status(200).json({message : "Seccessfully Logged Out"});
});

//Get User Data 
const getUser = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id);

    if(user){
        const {_id, name, email, photo, phone, bio}= user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
        });
    }else{
        res.status(400);
        throw new Error("User not found");
    }
});
    
// login Status
const loginStatus = asyncHandler(async (req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json(false);
    }
    //verify token 
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified){
        return res.json(true);
    }
    return res.json(false);
});

//update user
const updateUser = asyncHandler(async(req,res)=>{
    const user= await User.findById(req.user._id);
    if(user){
        const {_id, name, email, photo, phone, bio }= user;
        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;

        const updateUser = await user.save();
        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            photo: updateUser.photo,
            phone: updateUser.phone,
            bio: updateUser.bio,
        });
    }   
    else{
        res.status(404);
        throw new Error("User not found");
    }
 

});
//change password 
const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body;
  
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
    //Validate
    if (!oldPassword || !password) {
      res.status(400);
      throw new Error("Please add old and new password");
    }
  
    // check if old password matches password in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
  
    // Save new password
    if (user && passwordIsCorrect) {
      user.password = password;
      await user.save();
      res.status(200).send("Password change successfuly");
    } else {
      res.status(400);
      throw new Error("Old password is incorrect");
    }
  });
  
//forgot password
const forgotPassword = asyncHandler(async(req, res)=> {
    res.send("forgot password");
});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
};