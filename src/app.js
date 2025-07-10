const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
 
const cors = require("cors");

app.use(
  cors({
    //whitlisting the domain name
    origin: "http://localhost:5173",
    credentials: true,
  })
);
 
app.use(express.json()); // Middleware to parse JSON request body
app.use(cookieParser()); // Middleware to parse cookies

const authRouter = require("./routes/auth.js"); // Importing auth routes
const profileRouter = require("./routes/profile.js"); // Importing profile routes
const requestRouter = require("./routes/requests.js"); // Importing request routes
const userRouter = require("./routes/user.js");

app.use("/", authRouter); // Mounting auth routes at /api/auth
app.use("/", profileRouter); // Mounting profile routes at /api/profile
app.use("/", requestRouter); // Mounting request routes at /api/request
app.use("/", userRouter); // Mounting user routes at /api/user
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(30005, () => {
      console.log("Server started on port 30005");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err.message);

  });
