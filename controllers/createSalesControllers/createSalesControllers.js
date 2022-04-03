const { v4 } = require("uuid");
const connection = require("../../config/contactmysqldb");

const createSales = async (req, res) => {
  const id = v4();
  const {
    user_id,
    product_image,
    product_desc,
    product_price,
    product_amount,
    location,
  } = req.body;

  let date_ob = new Date();

  try {
    sql = `INSERT INTO create_sales ( 
      sales_id,
      user_id,
      product_image,
      product_desc,
      product_price,
      product_amount,
      location,
      posted_date) VALUES ('${id}','${user_id}','${product_image}','${product_desc}','${product_price}','${product_amount}','${location}','${date_ob}')`;
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
};

const findSales = (req, res) => {
  try {
    sql = "SELECT * FROM create_sales";
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.json(result);
      }
    });
  } catch (error) {}
};

const findTopUsers = (req, res) => {
  try {
    sql = "SELECT * FROM create_sales ORDER BY product_amount DESC";
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
};

function findTopUsersAmt(req, res) {
  try {
    sql = "SELECT * FROM create_sales ORDER BY product_price DESC";
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
}

function findSalesById(req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    sql = `SELECT * FROM create_sales WHERE sales_id = '${id}'`;
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
}

module.exports = {
  createSales,
  findSales,
  findTopUsers,
  findTopUsersAmt,
  findSalesById,
};
