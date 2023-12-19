const _ = require("lodash");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Bill, validate } = require("../models/bill");

router.get("/", auth, async (req, res) => {
  const bill = await Bill.find({ ownerId: req.user._id });
  res.send(bill);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let bill = new Bill(_.pick(req.body, [, "quantity", "items", "amount"]));
  bill.ownerId = req.user._id;

  bill = await bill.save();

  res.send(bill);
});

module.exports = router;
