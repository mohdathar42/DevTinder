const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation.js");
const User = require("../model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth.js");

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data is requiredbefore storing it in the database
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password before saving it to the database
    const passwordtHash = await bcrypt.hash(password, 10);

    //creating a new instanse of user model in the database

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordtHash,
    });

    //saving the user to the database
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//login user
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //check if the user exists in the database
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invailed Credentials");
    }
    //compare the user [passwords]
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 360000),
      });
      res.send(user);
    } else {
      throw new Error("Invailed Credentials");
    }
  } catch (err) {
    res.status(400).send(" ERROR:     " + err.message);
  }
});
//logout the user
authRouter.post("/logout", async (req, res) => {
  try {
    //deleting the cookie from the browser
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
  
    res.send("Logout successfull!!!!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;
