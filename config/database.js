const { connect } = require("mongoose");

connect(
  "mongodb+srv://aashish:12345@cluster0.d69ar.mongodb.net/myFirstDatabase",
  () => {
    try {
      console.log("Connected to database 😇 ");
    } catch (error) {
      console.log(error.message);
    }
  }
);
