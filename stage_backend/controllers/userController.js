const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");



//hash password
const hashPassword = async (password)=>{
    // Encrypt password before saving to DB 
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// verifie password
const verifePass = async (password, databasePassword) =>{
    return await bcrypt.compare(password, databasePassword);
};


//Generate Token 
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

     const hashedPassword = await hashPassword(password);


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
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Validate Request
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password");
    }
  
    // Check if user exists
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
  
    // User exists, check if password is correct
    const passwordIsCorrect = await verifePass(password, user.password)
  
    //   Generate Token
    const token = generateToken(user._id);
    
    if(passwordIsCorrect){
     // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
  }
    if (user && passwordIsCorrect) {
      const { _id, name, email, photo, phone, bio } = user;
      res.status(200).json({
        _id,
        name,
        email,
        photo,
        phone,
        bio,
        token,
      });
    } else {
      res.status(400);
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
      user.password = await hashPassword(password);
      await user.save();
      res.status(200).send("Password change successful");
    } else {
      res.status(400);
      throw new Error("Old password is incorrect");
    }
  });
  
//forgot password
const forgotPassword = asyncHandler(async(req, res)=> {
    const {email}= req.body;
    const user = await User.findOne({email});

    if(!user){
        res.status(404);
        throw new Error("Utilisateur non trouvable");
    }
    // delete token if it exists in DB 
    let token = await Token.findOne({userId: user._id});
    if (token) {
        await token.deleteOne();
    }
    //create Reset Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);
    
    // hash token before saving to DB
    const hashedToken= crypto
    .createHash("sha256").update(resetToken).digest("hex");
    console.log(hashedToken);
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 *(60*1000) // 30 minutes
    }).save();
    //Construct Reset Url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    // Reset Email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Veuillez utiliser l'url ci-dessous pour réinitialiser votre mot de passe</p>  
        <p>Ce lien de réinitialisation n'est valable que 30 minutes.</p>

        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        <p> Salutations...</p>
        <p>L'équipe de gestion des stocks </p>
    `;
    const subject = "Password Reset Request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try{
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({success : true, message: "Reset Email Sent"});
    }catch (error){
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
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