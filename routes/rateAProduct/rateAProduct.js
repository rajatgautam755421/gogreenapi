const connection = require("../../config/contactmysqldb");
const router = require("express").Router();
const { v4 } = require("uuid");

router.post("/rating/:product_id", (req, res) => {
  const { email, image, rating } = req.body;
  const { product_id } = req.params;
  const rating_id = v4();
  const date = new Date();
  try {
    sql = `INSERT INTO product_rating (rating_id,product_id,email,image,rating,data) VALUES ('${rating_id}','${product_id}','${email}','${image}','${rating}','${date}')`;
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

router.get("/rating/all/:product_id", async (req, res) => {
  const { product_id } = req.params;
  console.log(product_id);
  try {
    sql = `SELECT * FROM product_rating WHERE product_id = '${product_id}' ORDER BY data DESC`;
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
