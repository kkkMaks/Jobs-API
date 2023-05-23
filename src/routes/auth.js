const express = require("express");

const { login, register, updateUser } = require("../controllers/auth");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/updateUser").patch(authenticateUser, updateUser);

module.exports = router;
