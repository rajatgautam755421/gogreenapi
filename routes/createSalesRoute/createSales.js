const router = require("express").Router();
const {
  createSales,
  findSales,
  findTopUsers,
  findTopUsersAmt,
  findSalesById,
  findTopUsersAmtLowest,
  highestPrice,
  lowestPrice,
  findSalesByuser,
  deleteSales,
} = require("../../controllers/createSalesControllers/createSalesControllers");

router.route("/sales").post(createSales);
router.route("/sales").get(findSales);
router.route("/top-sellers").get(findTopUsers);
router.route("/top-sellersamt").get(findTopUsersAmt);
router.route("/top-highestprice").get(highestPrice);
router.route("/top-lowestPrice").get(lowestPrice);
router.route("/top-sellersamtlowest").get(findTopUsersAmtLowest);
router.get("/findsales/:id", findSalesById);
router.get("/findsales-user/:user_id", findSalesByuser);
router.delete("/findsales/:sales_id", deleteSales);

module.exports = router;
