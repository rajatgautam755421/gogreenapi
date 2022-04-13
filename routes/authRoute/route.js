const router = require("express").Router();
const {
  createAUser,
  userLogin,
  findUser,
  findUserAndUpdateEmail,
  findUserAndUpdateName,
  findUserByEmail,
  deleteAUser,
  findUserAndUpdatePhoto,
} = require("../../controllers/authController/controller");

// const { verify, isAuthorised } = require("../../middlewares/verifyUser");

router.post("/register", createAUser);
router.post("/login", userLogin);
router.get("/finduser/:id", findUser);
router.put("/finduserandupdateemail/:id", findUserAndUpdateEmail);
router.put("/finduserandupdatename/:id", findUserAndUpdateName);
router.put("/finduserandupdatephoto/:id", findUserAndUpdatePhoto);
router.get("/finduserbyemail/:email", findUserByEmail);
router.delete("/deleteUser/:id", deleteAUser);

module.exports = router;
