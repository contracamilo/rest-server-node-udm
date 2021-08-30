require("dotenv").config();
const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateJwt = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ message: "auth error" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);

    const user = await User.findById(uid);

    if (!user.status || !user)
      return res.status(401).json({ message: "bad credentials" });

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "auth error" });
  }
};

module.exports = {
  validateJwt,
};
