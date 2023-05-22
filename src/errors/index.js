const CustomAPIError = require("./base-custom-error");
const BadRequestError = require("./bad-request");
const UnauthenticatedError = require("./un-authenticated");
const NotFoundError = require("./not-found");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
};
