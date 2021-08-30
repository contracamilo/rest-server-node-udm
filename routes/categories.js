const { Router } = require("express");
const { check, checkSchema } = require("express-validator");
const {
  createCategory,
  getCategories,
  getCategoryByID,
  editCategory,
  deleteCategory,
} = require("../controller/categories");
const { categoryExistByID } = require("../helpers/dbValidators");
const { categorySchemaValidations } = require("../helpers/validations");

const { validateFields } = require("../middlewares/validate");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateAdminRole } = require("../middlewares/validateRoles");

const router = Router();

//get all
router.get("/", getCategories);

//category by id
router.get(
  "/:id",
  [
    check("id", "invalid ID").isMongoId(),
    check("id").custom(categoryExistByID),
    validateFields,
  ],
  getCategoryByID
);

//create category
router.post(
  "/",
  [validateJwt, check("name", "name is required").not().isEmpty()],
  createCategory
);

//edit category by id
router.put(
  "/:id",
  [
    validateJwt,
    checkSchema(categorySchemaValidations),
    check("id").custom(categoryExistByID),
    validateFields,
  ],
  editCategory
);

//Delete category by id
router.delete(
  "/:id",
  [
    validateJwt,
    validateAdminRole,
    check("id", "invalid ID").isMongoId(),
    check("id").custom(categoryExistByID),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
