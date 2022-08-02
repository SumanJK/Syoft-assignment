const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    user = await User.create(req.body);
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }

    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }

    const token = generateToken(user);

    return res.status(200).send({ user, token });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

module.exports ={register,login}