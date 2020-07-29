const mongoose = require("mongoose");
const ProductSchema = require("../models/product_from_models/product.model");

exports.upload = async function (req, res, next) {
  let { name, description, price } = req.body;
  if (!name || !description || !price) {
    res.status(400).send({ message: "absence of mandatory details" });
    return;
  }
  let Product = new ProductSchema({ name, description, price });
  Product.save({
    name,
    description,
    price,
  })
    .then((rs) => {
      if (rs) res.status(201).send({ message: "done" });
    })
    .catch((e) => {
      res.status(500).send({ message: "data not saved" });
      throw Error(e);
    });
};
