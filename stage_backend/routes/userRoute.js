const express = require("express");
const { registerUser, loginUser,logout, getUser,loginStatus, updateUser,
     changePassword, forgotPassword, verifyToken } = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser",protect,getUser);
router.get("/loggedin", loginStatus)
router.patch("/updateuser",protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword",forgotPassword);
router.post("/verify",verifyToken);


module.exports = router;