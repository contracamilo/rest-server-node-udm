const { response } = require("express");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { generateJwt } = require("../helpers/generateJwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "bad credentials" });
  }

  if (user.status === false) {
    return res.status(500).json({ message: "user doesn't exists" });
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "bad credentials" });
  }

  try {
    const token = await generateJwt(user.id);

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "fatal error contact service",
    });
  }
};

module.exports = {
  login,
};
