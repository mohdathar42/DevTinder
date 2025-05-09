const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  { 
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum:{
        values:["male","female","other"],
        message: `{VALUE} is not a valid gender type`},
    },
  
    photoUrl:{
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-978409_1280.png",
    },
    
    about: {
      type: String,
      default: "I am a new user",
    },
    skills: {
      type: [String],

      default: ["JavaScript", "React", "Node.js"],
    },
  },
  { timestamps: true }
);
 
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@TINDER$790", {
    expiresIn: "1d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
