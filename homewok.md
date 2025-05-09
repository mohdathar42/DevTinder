const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  throw new Error("hdsfsdhfjDHFLa");
  res.send("User data retrieved successfully!");
});

// error handler middleware function
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("somthing went wrong!");
  }
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
}); 
