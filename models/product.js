const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const productSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    lowercase: true,
  },
  costPrice: {
    type: Number,
    min: 1,
    required: true,
  },
  sellingPrice: {
    type: Number,
    min: 1,
    required: true,
  },
  inStock: {
    type: Number,
    min: 0,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);
function validateproduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    category: Joi.string().min(2).max(255).required(),
    costPrice: Joi.number().required().min(1),
    sellingPrice: Joi.number().required().min(1),
    inStock: Joi.number().required().min(0),
    discount: Joi.number().required(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateproduct;
