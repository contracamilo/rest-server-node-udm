const { request, response } = require("express");
const { Product, Category } = require("../models");

const createProduct = async (req = request, res = response) => {
  const { name, price, category } = req.body;
  const categoryUc = `${category}`.toUpperCase();

  const productDB = await Product.findOne({ name });
  const categoryDB = await Category.findOne({ name: categoryUc });

  if (productDB) {
    return res
      .status(400)
      .json({ message: `product ${productDB.name} already exists` });
  }

  let productCategory;

  if (categoryDB) {
    productCategory = categoryDB._id;
  } else {
    const newCategory = new Category({ name: categoryUc, user: req.user._id });
    await newCategory.save();
    productCategory = newCategory._id;
  }

  const data = {
    name: name,
    price: price,
    user: req.user._id,
    category: productCategory,
  };

  const product = new Product(data);
  await product.save();

  res.status(200).json(product);
};

const getProducts = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const count = await Product.countDocuments(query);
  const products = await Product.find(query)
    .populate("user", "name")
    .populate("category", "name")
    .limit(Number(limit))
    .skip(Number(from));

  res.status(200).json({
    count,
    products,
  });
};

const getProductsByID = async (req, res = response) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.status(200).json({
    product,
  });
};

const editProduct = async (req, res = response) => {
  const { id } = req.params;

  const { status, user, category, ...data } = req.body;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({
    ok: true,
    product,
  });
};

const deleteProduct = async (req, res = response) => {
  const id = req.params?.id;
  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.status(200).json({
    success: "ok",
    message: "product deleted",
    product,
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProductsByID,
  editProduct,
  deleteProduct,
};
