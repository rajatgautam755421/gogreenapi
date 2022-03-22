const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthModel = require("../../models/authModel/AuthModel");

//Create A User
const createAUser = async (req, res) => {
  const requestUser = await new AuthModel(req.body);
  try {
    const newUser = await requestUser.save();
    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

//Login In A User

const userLogin = async (req, res) => {
  //check if user is already present
  const presentUser = await AuthModel.findOne({ email: req.body.email });
  //Email exists or not
  if (!presentUser) return res.status(400).send("Email is not found");
  //password matches or not
  const validPassword = await bcrypt.compare(
    req.body.password,
    presentUser.hashedPassword
  );
  if (!validPassword) return res.status(400).json("Password is incorrect");

  try {
    await new AuthModel({
      email: req.body.email,
      password: req.body.password,
    });

    res.json({
      _id: presentUser._id,
      name: presentUser.name,
      email: presentUser.email,
      token: jwt.sign({ _id: presentUser._id }, process.env.TOKEN_SECRET),
    });
    res.header("auth-token", token).send(token);
  } catch (error) {
    res.status(500).json("Invalid Email Or Password");
  }
};

const dashboard = (req, res) => {
  res.json({
    msg: "Dashboard",
  });
};

module.exports = { createAUser, userLogin, dashboard };
