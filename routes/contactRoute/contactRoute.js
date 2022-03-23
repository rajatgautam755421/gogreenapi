const connection = require("../../config/contactmysqldb");
const router = require("express").Router();
const { v4 } = require("uuid");

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const email = req.body.email;
  const id = v4();
  try {
    sql = `INSERT INTO contactus (id,name,email, message) VALUES ('${id}','${name}', '${email}','${message}')`;
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

//Get All Contacts

router.get("/contact", (req, res) => {
  try {
    sql = "SELECT * FROM contactus";
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
