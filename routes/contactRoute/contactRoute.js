const ContactModel = require("../../models/contactModel/ContactModel");
const router = require("express").Router();

router.post("/contact", async (req, res) => {
  try {
    const result = await ContactModel.create(req.body);
    res.status(201).json({
      status: "Success",
      json: result,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
