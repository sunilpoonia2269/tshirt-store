const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [40, "Name should be under 40 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Provide a email"],
      validate: [validator.isEmail, "Please provide a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide a password"],
      minlength: [8, "Password must be 8 characters long"],
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    photo: {
      id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },

    forgotPasswordToken: String,
    fortgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

/// Encrypt password before save - HOOKS
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

/// Validate the password
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

/// Create and return JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

/// Generate forgot password token (String)
userSchema.methods.getForgotPasswordToken = function () {
  // generate a long and random string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  // Getting a hash -  make sure to get a hash on backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  // time on token
  this.fortgotPasswordExpiry =
    Date.now() + process.env.FORGOT_PASSWORD_EXPIRY * 60 * 1000;

  return forgotToken;
};
///
module.exports = mongoose.model("User", userSchema);
