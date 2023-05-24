const { BadRequestError } = require("../errors");

const testUser = (req, res, next) => {
  if (req.testUser) {
    throw new BadRequestError("Demo user has limited functionality");
  }
  next();
};

module.exports = testUser;
