const express = require("express");

const { login, register, updateUser } = require("../controllers/auth");
const { isAuthencticated, testUser } = require("../middleware");

const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    msg: "Too many requests from this IP, please try again 15 minutes",
  },
});

const router = express.Router();

router.route("/login").post(apiLimiter, login);
router.route("/register").post(apiLimiter, register);
router.route("/updateUser").patch(isAuthencticated, testUser, updateUser);

module.exports = router;
