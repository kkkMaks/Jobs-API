const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");

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
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const { name, lastName, email, location } = req.body;

  if (!name || !lastName || !email || !location) {
    throw new BadRequestError("Please provide all fields");
  }

  if (req.user.testUser) {
    throw new BadRequestError("Read-only for demo user");
  }

  const user = await User.findByIdAndUpdate(
    req.user.user._id,
    { name, lastName, email, location },
    { new: true }
  );

  const token = user.createJWT();

  return res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      token,
    },
  });
};

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();

  return res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      token,
    },
  });
};

module.exports = {
  login,
  register,
  updateUser,
};
