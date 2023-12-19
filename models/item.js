const mongoose = require("mongoose");
const Joi = require("joi");

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    minlength: 2,
    required: true,
    maxlength: 255,
  },
//   price: {
//     type: Number,
//     min: 1,
//     required: true,
//   },
//   quanity: {
//     type: Number,
//     min: 1,
//     required: true,
//   },
});

const Item = mongoose.model("Item", itemSchema);
function validateItem(item) {
  const schema = Joi.object({
    itemName: Joi.string().min(2).max(225).required(),
    // price: Joi.number().required().min(1),
    // quanity: Joi.number().required().min(1),
  });

  return schema.validate(item);
}

exports.Item = Item;
exports.validate = validateItem;
exports.itemSchema = itemSchema;
