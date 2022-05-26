const app = require("./app");
const PORT = process.env.PORT || 3000;
const connectWithDB = require("./config/db");
const cloudinary = require("cloudinary");

/// Connect with database
connectWithDB();

/// Cloudnary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//
app.listen(PORT, () => {
  console.log(`Server is running at port - ${PORT}`);
});
