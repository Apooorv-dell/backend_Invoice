const mongoose = require("mongoose");
const Joi = require("joi");
const itemSchema = require("./item");

const billSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  items: {
    type: [
      {
        itemName: String,
        price: Number,
        qty: Number,
      },
    ],
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  doc: {
    type: Date,

    default: Date.now(),
  },
});

const Bill = mongoose.model("Bill", billSchema);
function validateBill(bill) {
  const schema = Joi.object({
    quantity: Joi.number().required().min(1),
    items: Joi.required(),
    amount: Joi.number().required().min(1),
  });

  return schema.validate(bill);
}

exports.Bill = Bill;
exports.validate = validateBill;
