const jwt = require("jsonwebtoken");
const { Users } = require("../models");
module.exports = async (req, res, next) => {
  // console.log(req.headers.authorization);

  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        status: "failed",
        message: "Token is missing",
        isSucces: false,
        data: null,
      });
    }
    const token = bearerToken.split("Bearer ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPk(payload.userId);
    // if (bearerToken) {
    //   return res.status(401).json({
    //     status: "failed",
    //     message: "You are not authorized",
    //     isSucces: false,
    //     data: null,
    //   });
    // }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      isSucces: false,
      data: null,
    });
  }
};
