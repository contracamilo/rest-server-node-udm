const { Router } = require("express");
const { check, checkSchema } = require("express-validator");
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require("../controller/user");
const {
  isRoleValid,
  isEmailValid,
  userExistByID,
} = require("../helpers/dbValidators");
const { userSchemaValidations } = require("../helpers/validations");
const { validateFields } = require("../middlewares/validate");

const router = Router();

router.get("/", getUsers);
router.put(
  "/:id",
  [
    checkSchema(userSchemaValidations),
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(userExistByID),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  putUsers
);
router.post(
  "/",
  [
    checkSchema(userSchemaValidations),
    check("role").custom(isRoleValid),
    check("email").custom(isEmailValid),
    validateFields,
  ],
  postUsers
);
router.patch("/", patchUsers);
router.delete(
  "/:id",
  [
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(userExistByID),
    validateFields,
  ],
  deleteUsers
);

module.exports = router;
