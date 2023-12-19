const mongoose = require("mongoose");
const Joi = require("joi");

const businessDetailSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shopName: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  gstin: {
    type: String,
    required: true,
    unique: true,
    minlength: 15,
    maxlength: 15,
  },
  address: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});

const BusinessDetail = mongoose.model("BusinessDetail", businessDetailSchema);
function validateBusinessDetail(businessDetail) {
  const schema = Joi.object({
    shopName: Joi.string().min(3).required(),
    gstin: Joi.string().min(15).max(15).required(),
    address: Joi.string().required().min(3).max(255),
    city: Joi.string().required().max(255),
    pincode: Joi.number().required(),
  });

  return schema.validate(businessDetail);
}

exports.BusinessDetail = BusinessDetail;
exports.validate = validateBusinessDetail;
