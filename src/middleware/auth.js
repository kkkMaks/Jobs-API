const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const isAuthencticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = await User.findOne({
      _id: jwt.verify(token, process.env.JWT_SECRET).id,
    }).select("-password -__v");

    if (!user) {
      throw new UnauthenticatedError("Authentication invalid");
    }
    req.user = user;

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = isAuthencticated;
