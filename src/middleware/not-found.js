const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
};

module.exports = notFoundMiddleware;
