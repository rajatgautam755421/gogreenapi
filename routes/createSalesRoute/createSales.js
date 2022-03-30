const router = require("express").Router();
const {
  createSales,
} = require("../../controllers/createSalesControllers/createSalesControllers");

router.route("/sales").get(createSales);

module.exports = router;
