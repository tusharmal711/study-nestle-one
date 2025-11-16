
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../utils/multer"); // ✅ multer, not cloudinary
const { registerMaterial, getMaterials, updateMaterial, deleteMaterial } = require("../controller/materialController");

// CRUD routes
router.post("/registerMaterial", authMiddleware, upload.single("file"), registerMaterial); // file first stored locally
router.get("/getMaterial", getMaterials);
router.patch("/updateMaterial/:id", authMiddleware, updateMaterial);
router.delete("/deleteMaterial/:id", authMiddleware, deleteMaterial);

router.get("/checkAuth", authMiddleware, (req, res) => {
  res.status(200).json({ 
    message: "User is authenticated", 
    user: req.user ,
    loggedIn:true
  });
});

module.exports = router;


