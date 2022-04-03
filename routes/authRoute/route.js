const router = require("express").Router();
const {
  createAUser,
  userLogin,
  findUser,
} = require("../../controllers/authController/controller");

const { verify, isAuthorised } = require("../../middlewares/verifyUser");

router.post("/register", createAUser);

router.post("/login", userLogin);

router.get("/finduser/:id", findUser);

module.exports = router;
