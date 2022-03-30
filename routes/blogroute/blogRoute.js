const router = require("express").Router();
const { v4 } = require("uuid");
const connection = require("../../config/contactmysqldb");

router.post("/blog", async (req, res) => {
  const { title, description } = req.body;
  const id = v4();

  if (title !== "" || description !== "") {
    try {
      sql = `INSERT INTO blogs (post_id,title,description) VALUES ('${id}','${title}', '${description}')`;
      connection.query(sql, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.send(result);
        }
      });
    } catch (error) {}
  } else {
    console.log("please Enter Some Thing");
  }
});

router.get("/blog", (req, res) => {
  try {
    sql = "SELECT * FROM blogs";
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
