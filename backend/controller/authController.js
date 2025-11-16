const express= require("express");
const app=express();
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const validateuser= require("./validator");
const User = require('../models/user');
const { uploadOnCloudinary } = require("../utils/cloudinary");
app.use(cookieParser());

const registerUser=async(req,res)=>{
    try{
        console.log("Received registration data:", req.body);
        validateuser(req.body);
          
        //req.body.password=await bcrypt.hash(req.body.password,10);
        const newUser = await User.create(req.body);
        console.log("User created successfully:", newUser);
        res.status(200).json({ message: "user Register Successfully" });

    }catch(err){
       res.status(400).json({ error: err.message });
    }
}
const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // 1. Check if user exists
    const people = await User.findOne({ emailId });
    if (!people) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // 2. Compare password
    const isAllowed = await bcrypt.compare(password, people.password);
    if (!isAllowed) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // 3. Create token
    const token = jwt.sign(
      { id: people.id, emailId: people.emailId },
      process.env.JWT_KEY,
      { expiresIn: "10h" }
    );

    // 4. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "lax",
    });

    res.status(200).json({ message: "Login Successful", loggedIn: true });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const logoutUser=async(req,res)=>{
    try{
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.status(200).json({ message: "Logout Successfully" });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}

//get profile
const userProfile= async(req,res)=>{
    try {
   const userId = req.user.id || req.user._id;
    
    const person = await User.findById(userId).select("-password"); 

    if (!person) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({success: true,data: person});

  } catch (error) {
    res.status(500).json({success: false,message: error.message });
  }
} 
//update profile
const updateProfile=async(req,res)=>{
 try {
    const userId = req.user.id || req.user._id; 
    const { name, age, gender, photo, password } = req.body;

    // Find user
    const person = await User.findById(userId);
    if (!person) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update allowed fields
    if (name) person.name = name;
    if (age) person.age = age;
    if (gender) person.gender = gender;
    if (photo) person.photo = photo;

     if (req.file) {
      const uploadRes = await uploadOnCloudinary(req.file.path);
      if (!uploadRes) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload photo",
        });
      }
      person.photo = uploadRes.secure_url; // ✅ Cloudinary URL
    } else if (photo) {

      person.photo = photo;
    }

    if (password) person.password = password;

    await person.save(); 

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {id: person._id,name: person.name,age: person.age,emailId: person.emailId,
        gender: person.gender,photo: person.photo,},
    });
  } catch (error) {
    res.status(500).json({success: false,message: error.message,});
  }
};


module.exports={registerUser ,loginUser,logoutUser,userProfile,updateProfile};