require("dotenv").config();

const connectDB = require("./src/db/connect");
const User = require("./src/models/User");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await User.deleteMany();
    console.log("Deleted all users");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
