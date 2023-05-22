const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: { name: user.name },
    token,
  });
};

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();

  return res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

module.exports = {
  login,
  register,
};
