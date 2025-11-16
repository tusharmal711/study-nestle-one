
const express= require("express");
const router = express.Router();
const { registerUser, loginUser,logoutUser, userProfile,updateProfile} = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../utils/multer"); 

router.post("/register",registerUser);

router.post("/login",loginUser);

//logout
router.post("/logout",logoutUser);

router.get("/getProfile",authMiddleware,userProfile);

router.patch("/updateProfile",authMiddleware,upload.single("photo"),updateProfile);

module.exports=router;

