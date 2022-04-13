const router = require("express").Router();
const { v4 } = require("uuid");
const connection = require("../../config/contactmysqldb");

router.post("/reviewuser", async (req, res) => {
  const review_id = v4();
  const { user_email, review } = req.body;
  console.log(review);
  try {
    sql = `INSERT INTO user_review (review_id,user_email,review) VALUES ('${review_id}','${user_email}', '${review}')`;
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

router.get("/reviewusers/:email", (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    sql = `SELECT * FROM user_review WHERE user_email = '${email}'`;
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
