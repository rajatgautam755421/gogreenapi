const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const Port = process.env.PORT || 3000;
require("./config/database");

//Global Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
dotenv.config({ path: "./config/.env" });

//Importing Routes
const authRoute = require("./routes/authRoute/route");
const contactRoute = require("./routes/contactRoute/contactRoute");
const khaltiRoute = require("./routes/khaltiroute/khalti");

//Implement Routes
app.use("/api/v1", authRoute);
app.use("/api/v1", contactRoute);
app.use("/api/v1", khaltiRoute);

app.get("*", (req, res) => {
  res.status(200).json({
    status: "Failure",
    msg: "Page not found",
  });
});

app.listen(Port, () => {
  console.log("Listening At 3000");
});
