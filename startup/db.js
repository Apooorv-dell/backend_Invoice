const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/invoicer")
    .then(() => console.log("conneted to port db"));
  // .catch((err) => console.error("Could not connect to MongoDB..."));
};
