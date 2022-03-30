const router = require("express").Router();
const axios = require("axios");

router.post("/payment/verify", (req, res) => {
  console.log(req.body);
  const { token, amount } = req.body;
  console.log(token, amount);
  let data = {
    token: token,
    amount: amount,
  };

  let config = {
    headers: {
      Authorization: process.env.KHALTI_SECRET_KEY,
    },
  };

  try {
    axios
      .post("https://khalti.com/api/v2/payment/verify/", data, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
