const isAuthencticated = require("./auth");
const testUser = require("./restrict");
const errorHandlerMiddleware = require("./error-handler");
const notFoundMiddleware = require("./not-found");

module.exports = {
  isAuthencticated,
  testUser,
  errorHandlerMiddleware,
  notFoundMiddleware,
};
