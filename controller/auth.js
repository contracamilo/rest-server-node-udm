const { response } = require("express");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { generateJwt } = require("../helpers/generateJwt");
const { googleVerify } = require("../helpers/googleVerify");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: "_x",
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(400).json({ message: "user not found, contact admin" });
    }

    const token = await generateJwt(user.id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.json({ mdg: "ok" });
};

module.exports = {
  login,
  googleSignIn,
};
