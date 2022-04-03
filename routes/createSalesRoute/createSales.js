const router = require("express").Router();
const {
  createSales,
  findSales,
  findTopUsers,
  findTopUsersAmt,
  findSalesById,
} = require("../../controllers/createSalesControllers/createSalesControllers");

router.route("/sales").post(createSales);
router.route("/sales").get(findSales);
router.route("/top-sellers").get(findTopUsers);
router.route("/top-sellersamt").get(findTopUsersAmt);
router.get("/findsales/:id", findSalesById);

module.exports = router;
