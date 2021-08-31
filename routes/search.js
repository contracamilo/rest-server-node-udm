const { Router } = require("express");
const { search } = require("../controller/search");

const router = Router();

//get
router.get("/:collection/:criteria", search);

module.exports = router;
