const mongoose = require("mongoose");
const { DB } = require("../config");

module.exports.connectDB = () => {
  mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  return mongoose.connection;
};