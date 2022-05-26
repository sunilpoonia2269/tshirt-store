const User = require("../models/User");
const BigPromise = require("../middleware/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary");

exports.signup = BigPromise(async (req, res, next) => {
  let result;
  if (req.files) {
    let file = req.files.userimage;
    result = await cloudinary.v2.uploader.upload(file, {
      folder: "user",
      width: 150,
      crop: "scale",
    });
  }

  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomError("Email, Name and Password are mandatory", 400));
  }
  if (password.length < 8) {
    return next(new CustomError("Password must be 8 characeters long", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    photo: {
      id: result.public_id,
      secure_url: result.secure_url,
    },
  });

  /// Send response with cookie
  cookieToken(user, res);
});
