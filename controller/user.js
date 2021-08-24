const { response, request } = require("express");
const { encryptPass } = require("../helpers/encrypt");
const { User } = require("../models");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [count, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(Number(limit)).skip(Number(from)),
  ]);

  res.status(200).json({
    ok: true,
    count,
    users,
  });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //encryption
  user.password = encryptPass(password);

  //save to db
  await user.save();

  res.status(200).json({
    ok: true,
    user,
  });
};

const putUsers = async (req, res = response) => {
  const id = req.params?.id;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    rest.password = encryptPass(password);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(200).json({
    ok: true,
    user,
  });
};

const patchUsers = (req, res = response) => {
  res.status(200).json({
    ok: true,
    message: "patch API - C",
  });
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  // delete from DB
  //const user = await User.findByIdAndDelete(id);

  // turn user status to false
  const user = await User.findByIdAndUpdate(id, { status: false });

  res.status(200).json({
    ok: "inactive user",
    user,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
