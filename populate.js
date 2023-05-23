require("dotenv").config();

const mockJobData = require("./MOCK_DATA.json");
const Job = require("./src/models/Job");
const connectDB = require("./src/db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.create(mockJobData);
    console.log("Created jobs");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
