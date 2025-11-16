const Material = require("../models/studyMaterials");
const { uploadOnCloudinary } = require("../utils/cloudinary");

// Upload & register material
const registerMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
     const fileType = req.file.mimetype;
     let resourceType = "image"; // default
     if (fileType === "application/pdf") resourceType = "raw";
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Failed to upload file to Cloudinary" });
    }

    const materialData = {
      ...req.body,
      linkOrFile: cloudinaryResponse.secure_url,
      publicId: cloudinaryResponse.public_id,
      uploadedBy: req.u._id, // fallback
      isApprove: false, // pending admin approval
    };

    const savedMaterial = await Material.create(materialData);
   
    res.status(201).json({
      message: "✅ Material uploaded successfully. Waiting for admin approval.",
      data: savedMaterial,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// READ
const getMaterials = async (req, res) => {
  try {
    const result = await Material.find({ isApprove: true })
    .populate("uploadedBy", "name") .exec();
    //console.log("res=",result);
    res.status(200).json({ message: "Data fetched successfully", result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updated = await Material.findByIdAndUpdate(id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.status(200).json({ message: "Updated successfully", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteMaterial = async (req, res) => {
  try {
    const result = await Material.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json({ message: "Deleted successfully", result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {registerMaterial,getMaterials,updateMaterial,deleteMaterial,};
