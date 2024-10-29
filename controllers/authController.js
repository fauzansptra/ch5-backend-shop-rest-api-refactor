const jwt = require("jsonwebtoken");
const { Auths, Users } = require("../models");
const bcrypt = require("bcrypt");
const { da, tr } = require("@faker-js/faker");

const register = async (req, res, next) => {
  try {
    res.status(201).json({
      status: "Success",
      data: {},
    });
  } catch (err) {}
};

const login = async (req, res, next) => {
  // console.log("masuk ga ke login");
  try {
    const { email, password } = req.body;

    // const emailUser=await

    const data = await Auths.findOne({
      include: [{ model: Users, as: "user" }],
      where: {
        email,
      },
    });

    console.log(data);

    if (!data) {
      return res.status(404).json({
        status: "Failed",
        message: "User does not exist",
        // data: token,
        isSucces: "false",
        data: null,
      });
    }

    if (data && bcrypt.compareSync(password, data.password)) {
      const token = jwt.sign(
        {
          id: data.id,
          username: data.user.name,
          email: data.email,
          userId: data.user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRED }
      );
      res.status(200).json({
        status: "Success",
        message: "Success login",
        isSucces: true,
        data: { username: data.user.name, token },
        // data: { token },
      });
    } else {
      res.status(401).json({
        status: "Failed",
        message: "Wrong Password",
        isSucces: false,
        // data: { username: data.user.name, token },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Success",
      message: err.message,
      data: null,
    });
  }
};

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {}
};

module.exports = {
  register,
  login,
  authenticate,
};
