const { Role, User, Category, Product } = require("../models");

const isRoleValid = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) throw new Error(`${role} is invalid`);
};

const isEmailValid = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) throw new Error(`${email} is already used`);
};

const userExistByID = async (id = "") => {
  const userExists = await User.findById(id);
  if (!userExists) throw new Error(`id is already used`);
};

const categoryExistByID = async (id = "") => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists) throw new Error(`${id} is already used`);
};

const productExistByID = async (id = "") => {
  const productExists = await Product.findById(id);
  if (!productExists) throw new Error(`${id} is already used in a product`);
};

const allowedCols = (collection = "", allowedCols = []) => {
  const isAllowed = allowedCols.includes(collection);
  if (!isAllowed) {
    throw new Error(
      `this ${collection} is not allowed, must be ${allowedCols}`
    );
  }

  return true;
};

module.exports = {
  isRoleValid,
  isEmailValid,
  userExistByID,
  categoryExistByID,
  productExistByID,
  allowedCols,
};
