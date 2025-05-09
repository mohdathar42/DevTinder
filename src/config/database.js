 const mongoose = require("mongoose");
  const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mohdatharkhan42:yJI9A6Ii2BoWdKtX@masternode.8gtbm.mongodb.net/devTinder"
  );
};
 

  module.exports = connectDB;