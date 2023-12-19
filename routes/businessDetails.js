const _ = require("lodash");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { BusinessDetail, validate } = require("../models/businessDetail");
const { validateOwnerId } = require("../utils/ownerId");

router.get("/", auth, async (req, res) => {
  const businessDetails = await BusinessDetail.find({ ownerId: req.user._id });

  res.send(businessDetails);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let businessDetail = new BusinessDetail(
    _.pick(req.body, ["shopName", "gstin", "address", "city", "pincode"])
  );
  businessDetail.ownerId = req.user._id;
  businessDetail = await businessDetail.save();

  res.send(businessDetail);
});

// put request remaining

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const businessDetail = await BusinessDetail.findByIdAndUpdate(
    req.params.id,
    {
      ownerId: req.user._id,
      shopName: req.body.name,
      gstin: req.body.gstin,
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode,
    },
    { new: true }
  );

  if (!businessDetail)
    return res
      .status(404)
      .send("The businessDetail  with the given ID was not found.");

  res.send(businessDetail);
});

module.exports = router;
