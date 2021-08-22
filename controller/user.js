const { response, request } = require("express");

const getUsers = (req = request, res = response) => {
  const query = req.query;

  res.status(200).json({
    ok: true,
    message: "get API - C",
    query,
  });
};

const postUsers = (req, res = response) => {
  const body = req.body;

  res.status(200).json({
    ok: true,
    message: "post API - C",
    body,
  });
};

const putUsers = (req, res = response) => {
  const id = req.params?.id;

  res.status(200).json({
    ok: true,
    message: "put API - C",
    id,
  });
};

const patchUsers = (req, res = response) => {
  res.status(200).json({
    ok: true,
    message: "patch API - C",
  });
};

const deleteUsers = (req, res = response) => {
  res.status(200).json({
    ok: true,
    message: "delete API - C",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
