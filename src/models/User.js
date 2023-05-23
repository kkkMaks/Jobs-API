const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 2,
    maxlength: 30,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50,
    default: "change me",
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please provide a valid email address");
      }
    },
    unique: true,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 30,
    default: "change me",
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
