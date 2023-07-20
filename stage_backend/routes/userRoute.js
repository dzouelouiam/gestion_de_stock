const express = require("express");
const { registerUser, loginUser,logout } = require("../controllers/userController");
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", getuser);

module.exports = router;