const { Router } = require("express");
const { check, checkSchema } = require("express-validator");
const { login } = require("../controller/auth");
const { validateFields } = require("../middlewares/validate");

const router = Router();

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
