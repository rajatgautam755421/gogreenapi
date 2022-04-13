const router = require("express").Router();
const { v4 } = require("uuid");
const connection = require("../../config/contactmysqldb");

router.post("/payment-areca", (req, res) => {
  const id = v4();
  const { amount, idx, mobile, product_name, product_url } = req.body;
  try {
    sql = `INSERT INTO arecanut (amount,idx,mobile,product_name,product_url,transaction_id) VALUES ('${amount}','${idx}','${mobile}','${product_name}','${product_url}','${id}')`;
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
