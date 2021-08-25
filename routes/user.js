const { Router } = require("express");
const { check, checkSchema } = require("express-validator");

const { validateFields } = require("../middlewares/validate");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateAdminRole, hasRole } = require("../middlewares/validateRoles");

const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require("../controller/user");

const {
  isEmailValid,
  isRoleValid,
  userExistByID,
} = require("../helpers/dbValidators");
const { userSchemaValidations } = require("../helpers/validations");

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
    validateJwt,
    //validateAdminRole,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(userExistByID),
    validateFields,
  ],
  deleteUsers
);

module.exports = router;
