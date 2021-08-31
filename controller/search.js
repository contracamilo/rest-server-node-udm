const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product, Role } = require("../models");

const allowedCollections = ["users", "categories", "products", "roles"];

const findUser = async (criteria = "", res = response) => {
  const isMongoID = ObjectId.isValid(criteria);

  if (isMongoID) {
    const user = await User.findById(criteria);
    return res.json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(criteria, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });
  return res.json({ results: users });
};

const findProducts = async (criteria = "", res = response) => {
  const isMongoID = ObjectId.isValid(criteria);

  if (isMongoID) {
    const products = await Product.findById(criteria).populate(
      "category",
      "name"
    );
    return res.json({ results: products ? [products] : [] });
  }

  const regex = new RegExp(criteria, "i");

  const products = await Product.find({
    $or: [{ name: regex }],
    $and: [{ status: true }, { available: true }],
  }).populate("category", "name");
  return res.json({ results: products });
};

const findCategory = async (criteria = "", res = response) => {
  const isMongoID = ObjectId.isValid(criteria);

  if (isMongoID) {
    const categories = await Category.findById(criteria);
    return res.json({ results: categories ? [categories] : [] });
  }

  const regex = new RegExp(criteria, "i");

  const categories = await Category.find({
    $or: [{ name: regex }],
    $and: [{ status: true }],
  });
  return res.json({ results: categories });
};

const findRole = async (criteria = "", res = response) => {
  const isMongoID = ObjectId.isValid(criteria);

  if (isMongoID) {
    const roles = await Role.findById(criteria);
    return res.json({ results: roles ? [roles] : [] });
  }

  const regex = new RegExp(criteria, "i");

  const roles = await Role.find({ role: regex });
  return res.json({ results: roles });
};

const search = (req, res = response) => {
  const { collection, criteria } = req.params;

  if (!allowedCollections.includes(collection)) {
    res.status(400).json({
      message: `${collection} doesn't exists in collections`,
    });
  }

  switch (collection) {
    case "users":
      findUser(criteria, res);
      break;
    case "products":
      findProducts(criteria, res);
      break;
    case "categories":
      findCategory(criteria, res);
      break;
    case "roles":
      findRole(criteria, res);
      break;
    default:
      res.status(500).json({
        message: `A collection name is needed`,
      });
      break;
  }
};

module.exports = {
  search,
};
