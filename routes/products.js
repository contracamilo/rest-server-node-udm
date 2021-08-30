const { Router } = require("express");
const { check, checkSchema } = require("express-validator");
const { getCategoryByID } = require("../controller/categories");

const {
  createProduct,
  getProducts,
  getProductsByID,
  deleteProduct,
  editProduct,
} = require("../controller/products");
const {
  productExistByID,
  categoryExistByID,
} = require("../helpers/dbValidators");
const { categorySchemaValidations } = require("../helpers/validations");

const { validateFields } = require("../middlewares/validate");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateAdminRole } = require("../middlewares/validateRoles");

const router = Router();

//get all products
router.post(
  "/",
  [
    validateJwt,
    check("name", "name is required").not().isEmpty(),
    check("category", "category is required").not().isEmpty(),
    check("category").custom(categoryExistByID),
  ],
  createProduct
);

//get all products
router.get("/", getProducts);

//product by id
router.get(
  "/:id",
  [
    check("id", "invalid ID").isMongoId(),
    check("id").custom(productExistByID),
    validateFields,
  ],
  getProductsByID
);

//Edit product by id
router.put(
  "/:id",
  [
    validateJwt,
    check("id", "invalid ID").isMongoId(),
    check("id").custom(productExistByID),
    validateFields,
  ],
  editProduct
);

//Delete product by id
router.delete(
  "/:id",
  [
    validateJwt,
    validateAdminRole,
    check("id", "invalid ID").isMongoId(),
    check("id").custom(productExistByID),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
