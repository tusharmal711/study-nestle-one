const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload file
    const response = await cloudinary.uploader.upload(localFilePath, {
      
      resource_type: "auto",   // auto-detect type (image, pdf, video, etc.)
      folder: "study_materials",
    });

    console.log("✅ File uploaded successfully:", response.secure_url);

    // Cleanup local file
    try {
      fs.unlinkSync(localFilePath);
    } catch (cleanupErr) {
      console.warn("⚠️ Failed to delete temp file:", cleanupErr.message);
    }

    return response;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error.message);

    // Cleanup on error
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (cleanupErr) {
        console.warn("⚠️ Failed to delete temp file after error:", cleanupErr.message);
      }
    }

    return null;
  }
};

module.exports = { uploadOnCloudinary, cloudinary };
