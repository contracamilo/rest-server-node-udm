const { Role, User } = require("../models");

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

module.exports = { isRoleValid, isEmailValid, userExistByID };
