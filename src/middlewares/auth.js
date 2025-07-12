const jwt = require("jsonwebtoken");
const User= require("../model/user.js");
const cookieParser = require("cookie-parser");

 
const userAuth = async (req, res, next) => {
  try {
    //read the token from the cookie
    const { token } = req.cookies;
    if(!token) {
      return res.status(401).send("Please Login!!!")
 
    }
    const decodedObj = await jwt.verify(token, "DEV@TINDER$790");
    //get the userId from the decoded token
    const { _id } = decodedObj;
    //find the user in the database using the userId
    const user = await User.findById({ _id });
    if (!user) {
      throw new Error("User does not exist");
    }
    req.user=user;
    next();
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
};
module.exports ={userAuth};