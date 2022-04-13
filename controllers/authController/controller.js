const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthModel = require("../../models/authModel/AuthModel");
let nodemailer = require("nodemailer");

//Create A User
const createAUser = async (req, res) => {
  const { email } = req.body;
  const response = await AuthModel.findOne({ email: email });
  console.log(response);
  if (!response) {
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
  } else {
    res.json({
      status: "failed",
      msg: "User Already Exists",
    });
  }
};

//Login In A User

const userLogin = async (req, res) => {
  //check if user is already present
  const presentUser = await AuthModel.findOne({ email: req.body.email });
  //Email exists or not
  if (!presentUser)
    return res.status(400).json({
      status: "failed",
      msg: "Email Not Found",
    });
  //password matches or not
  const validPassword = await bcrypt.compare(
    req.body.password,
    presentUser.hashedPassword
  );
  if (!validPassword)
    return res.status(400).json({
      status: "failed",
      msg: "Password Did Not Match",
    });

  try {
    await new AuthModel({
      email: req.body.email,
      password: req.body.password,
    });

    res.json({
      _id: presentUser._id,
      name: presentUser.name,
      email: presentUser.email,
      pic: presentUser.pic,
      role: presentUser.role,
      token: jwt.sign({ _id: presentUser._id }, process.env.TOKEN_SECRET),
    });
    // res.header("auth-token", token).send(token);
  } catch (error) {
    res.status(500).json("Invalid Email Or Password");
  }
};

const findUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await AuthModel.findById({ _id: id });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

const findUserAndUpdateEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const response = await AuthModel.findByIdAndUpdate(
      { _id: id },
      { email: email },
      { new: true, runValidators: true }
    );
    res.json(response);
  } catch (error) {
    if (error.code === 11000) {
      res.send("This Email Already Exists");
    } else {
      res.json(error.message);
    }
  }
};
const findUserAndUpdateName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const response = await AuthModel.findByIdAndUpdate(
      { _id: id },
      { name: name },
      { new: true, runValidators: true }
    );
    res.json(response);
  } catch (error) {
    res.json(error.message);
    console.log(error.message);
  }
};

const findUserAndUpdatePhoto = async (req, res) => {
  const { id } = req.params;
  const { pic } = req.body;
  try {
    const response = await AuthModel.findByIdAndUpdate(
      { _id: id },
      { pic: pic },
      { new: true, runValidators: true }
    );
    res.json(response);
  } catch (error) {
    res.json(error.message);
    console.log(error.message);
  }
};

const findUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const response = await AuthModel.findOne({ email: email });
    res.json(response);
  } catch (error) {
    res.json(error.message);
  }
};

const deleteAUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const response = await AuthModel.findByIdAndDelete({ _id: id });
    res.json(response);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createAUser,
  userLogin,
  findUser,
  findUserAndUpdateEmail,
  findUserAndUpdateName,
  findUserByEmail,
  deleteAUser,
  findUserAndUpdatePhoto,
};
