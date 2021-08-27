const { Router } = require("express");
const { check, checkSchema } = require("express-validator");
const { login, googleSignIn } = require("../controller/auth");
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

router.post(
  "/google",
  [check("id_token", "id_token is required").not().isEmpty(), validateFields],
  googleSignIn
);

module.exports = router;
