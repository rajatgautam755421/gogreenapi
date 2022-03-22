const router = require("express").Router();
const {
  createAUser,
  dashboard,
  userLogin,
} = require("../../controllers/authController/controller");

const { verify, isAuthorised } = require("../../middlewares/verifyUser");

router.post("/register", createAUser);

router.post("/login", userLogin);

router.get("/dashboard", verify, isAuthorised("Admin"), dashboard);

module.exports = router;
