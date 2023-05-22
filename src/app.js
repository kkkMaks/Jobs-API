require("dotenv").config();
require("express-async-errors");

const express = require("express");

const connectDB = require("./db/connect");

const authenticateUser = require("./middleware/auth");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening on port ${port} ...`));
  } catch (error) {
    console.log(error);
  }
};

start();
