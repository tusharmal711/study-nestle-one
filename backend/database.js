// const mongoose=require("mongoose");

// async function main() {
//   await mongoose.connect('');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// module.exports=main;

// const mongoose = require('mongoose');

// async function main() {

//     await mongoose.connect(process.env.DB_CONNECTION);
    
// }

// module.exports=main;
require('dotenv').config();
const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = main;
