const connection = require("../../config/contactmysqldb");
const router = require("express").Router();
const { v4 } = require("uuid");

router.post("/aerika", async (req, res) => {
  const itemId = v4();
  let date_ob = new Date();
  const { name, iteminfo, price, quantity, photo } = req.body;
  try {
    sql = `INSERT INTO aerica_uten (itemId,name,iteminfo,price,quantity,photo,date_ob) VALUES ('${itemId}','${name}', '${iteminfo}', '${price}', '${quantity}', '${photo}','${date_ob}')`;
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

router.get("/aerika/getall", async (req, res) => {
  try {
    sql = "SELECT * FROM aerica_uten";
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

router.delete("/aerika/:itemId", (req, res) => {
  const { itemId } = req.params;
  try {
    sql = `DELETE FROM aerica_uten WHERE itemId = '${itemId}'`;
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
