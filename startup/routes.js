const express = require("express");
const users = require("../routes/users");
const businessDetails = require("../routes/businessDetails");
const products = require("../routes/products");
const bills = require("../routes/bills");
const auths = require("../routes/auths")
const error = require("../middleware/error")



module.exports = function (app) {

  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auths", auths);
  app.use("/api/businessDetails", businessDetails);
  app.use("/api/products", products);
  app.use("/api/bills", bills);
  app.use(error)

  // the special middleware function for error
};
