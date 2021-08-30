const { request, response } = require("express");
const { Category } = require("../models");

const createCategory = async (req = request, res = response) => {
  const name = `${req.body.name}`.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res
      .status(400)
      .json({ message: `category ${categoryDB.name} already exists` });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);
  await category.save();

  res.status(200).json(category);
};

const getCategories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const count = await Category.countDocuments(query);
  const categories = await Category.find(query)
    .populate("user", "name")
    .limit(Number(limit))
    .skip(Number(from));

  res.status(200).json({
    count,
    categories,
  });
};

const getCategoryByID = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate("user", "name");

  res.status(200).json({
    category,
  });
};

const editCategory = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = `${data.name}`.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({
    ok: true,
    category,
  });
};

const deleteCategory = async (req, res = response) => {
  const id = req.params?.id;
  const category = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.status(200).json({
    success: "ok",
    message: "category deleted",
    category,
  });
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryByID,
  editCategory,
  deleteCategory,
};
