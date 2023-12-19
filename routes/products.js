const _ = require("lodash");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Product, validate } = require("../models/product");
const list = require("../utils/list");

router.get("/", auth, async (req, res) => {
  const products = await Product.find({ ownerId: req.user._id });

  res.send(products);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let product = new Product(
    _.pick(req.body, [
      "name",
      "category",
      "costPrice",
      "sellingPrice",
      "inStock",
      "discount",
    ])
  );
  product.ownerId = req.user._id;

  product = await product.save();

  res.send(product);
});

// put request remaining
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ownerId: req.user._id,
      name: req.body.name,
      category: req.body.category,
      costPrice: req.body.costPrice,
      sellingPrice: req.body.sellingPrice,
      inStock: req.body.inStock,
      discount: req.body.discount,
    },
    { new: true }
  );

  if (!product)
    return res
      .status(404)
      .send("The Product  with the given ID was not found.");

  res.send(product);
});

// deleteing the prodcut
router.delete("/:id", auth, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");

  res.send(product);
});

// getting categories list

router.get("/categories", auth, async (req, res) => {
  const products = await Product.find({ ownerId: req.user._id });
  const categoires = list(products);
  res.send(categoires);
});

module.exports = router;
