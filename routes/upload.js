const { Router } = require("express");
const { check, checkSchema } = require("express-validator");
const {
  loadFile,
  updateImage,
  showImage,
  updateImageCloudinary,
} = require("../controller/uploads");
const { allowedCols } = require("../helpers/dbValidators");
const { validateFields } = require("../middlewares/validate");
const { validateFiles } = require("../middlewares/validateFile");

const router = Router();

router.post("/", validateFiles, loadFile);
router.put(
  "/:collection/:id",
  [
    validateFiles,
    check("id", "is not a valid id").isMongoId(),
    check("collection").custom((collection) =>
      allowedCols(collection, ["users", "products"])
    ),
    validateFields,
  ],
  updateImageCloudinary
  //updateImage
);
router.get(
  "/:collection/:id",
  [
    check("id", "is not a valid id").isMongoId(),
    check("collection").custom((collection) =>
      allowedCols(collection, ["users", "products"])
    ),
    validateFields,
  ],
  showImage
);

module.exports = router;
