const express= require("express");
const router = express.Router();
const { loginAdmin,logoutAdmin} = require("../controller/adminController");
const {pendingMaterial,acceptMaterial, rejectMaterial } = require("../controller/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");


router.post("/adminlogin",loginAdmin);

router.post("/logout",logoutAdmin);

router.get("/pending", adminMiddleware, pendingMaterial);

router.patch("/approve/:id", adminMiddleware,acceptMaterial );

router.delete("/reject/:id", adminMiddleware, rejectMaterial);

router.get("/checkAdmin", adminMiddleware, (req, res) => {
 
  res.status(200).json({ 
    message: "User is authenticated", 
    user: req.user 
  });
});

module.exports=router;