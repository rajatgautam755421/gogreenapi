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

function findTopUsersAmtLowest(req, res) {
  try {
    sql = "SELECT * FROM create_sales ORDER BY product_amount";
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

function highestPrice(req, res) {
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

function lowestPrice(req, res) {
  try {
    sql = "SELECT * FROM create_sales ORDER BY product_price";
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

async function findSalesByuser(req, res) {
  const { user_id } = req.params;
  console.log(user_id);
  try {
    sql = `SELECT * FROM create_sales WHERE user_id = '${user_id}'`;
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

const deleteSales = async (req, res) => {
  const { sales_id } = req.params;
  try {
    sql = `DELETE FROM create_sales WHERE sales_id = '${sales_id}'`;
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
};

module.exports = {
  createSales,
  findSales,
  findTopUsers,
  findTopUsersAmt,
  findSalesById,
  findTopUsersAmtLowest,
  highestPrice,
  lowestPrice,
  findSalesByuser,
  deleteSales,
};
