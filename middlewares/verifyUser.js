const AuthModel = require("../models/authModel/AuthModel");

const jwt = require("jsonwebtoken");

//Checking For User Authorization
function verify(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(403).send("Not Authenticated");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

function isAuthorised(role) {
  return async (req, res, next) => {
    const isUser = await AuthModel.findById({ _id: req.user._id });
    try {
      if (!isUser) {
        res.status(401).send("Not Authenticated");
      } else {
        if (role === isUser.role) {
          next();
        } else {
          res.status(403).send(`${isUser.name},you are not authorised!!!`);
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
}

module.exports = { verify, isAuthorised };
