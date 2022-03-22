const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
// const mysql = require("mysql2");
const cors = require("cors");
const app = express();
require("./config/database");
const axios = require("axios");
const PORT = process.env.PORT || 3000;

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "Aman",
// });

// connection.connect((err) => {
//   if (err) {
//     throw err.message;
//   } else {
//     console.log("My SQL database Connection");
//   }
// });

// app.post("/database", async (req, res) => {
//   const { name, message } = await req.body;
//   try {
//     sql = `INSERT INTO contact (name,message) VALUES ('${name}','${message}')`;
//     connection.query(sql, (err) => {
//       if (err) {
//         throw err;
//       } else {
//         res.send("DataBase Created");
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

//Global Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
dotenv.config({ path: "./config/.env" });

//Importing Routes
const authRoute = require("./routes/authRoute/route");
const contactRoute = require("./routes/contactRoute/contactRoute");

//Implement Routes
app.use("/api/v1", authRoute);
app.use("/api/v1", contactRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    msg: "welcome to home page",
  });
});

app.post("/api/v1/payment/verify", async (req, res) => {
  let data = {
    token: "QUao9cqFzxPgvWJNi9aKac",
    amount: 900,
  };

  let config = {
    headers: {
      Authorization: "test_secret_key_31baef07122c4822a2823fd38678d0be",
    },
  };

  axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  // const { token, amount, Authorization } = req.body;
  // console.log(token, amount, Authorization);
  // // console.log(typeof amount);
  // let data = {
  //   token: token,
  //   amount: amount,
  // };

  // let config = {
  //   headers: {
  //     Authorization: Authorization,
  //   },
  // };

  // try {
  //   axios
  //     .post("https://khalti.com/api/v2/payment/verify/", data, config)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // } catch (error) {
  //   console.log(error.message);
  // }
});

app.listen(PORT, () => {
  console.log("Listening At 3000");
});
