const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Job = require("../models/Job");
const { ObjectId } = require("mongoose").Types;

const moment = require("moment");

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.id,
  };

  if (search) queryObject.position = { $regex: search, $options: "i" };
  if (status && status !== "all") queryObject.status = status;
  if (jobType && jobType !== "all") queryObject.jobType = jobType;

  let result = Job.find(queryObject);

  if (sort === "latest") result = result.sort("-createdAt");
  if (sort === "oldest") result = result.sort("createdAt");
  if (sort === "a-z") result = result.sort("position");
  if (sort === "z-a") result = result.sort("-position");

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await result.skip(skip).limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  return res.status(200).json({ totalJobs, numOfPages, jobs });
};

const getJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId, createdBy: req.user.id });

  if (!job) {
    throw new BadRequestError(`No job with id ${id}`);
  }

  return res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const { company, position, status, jobLocation, jobType } = req.body;
  const userId = req.user.id;

  if (!company || !position || !userId || !jobLocation || !jobType) {
    throw new BadRequestError("Please provide all required fields");
  }

  const job = await Job.create({
    company,
    position,
    status,
    jobLocation,
    jobType,
    createdBy: userId,
  });

  return res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { company, position, status, jobLocation, jobType } = req.body;

  if (!company && !position && !status && !jobLocation && !jobType) {
    throw new BadRequestError(
      "Please provide at least one field to update (company, position, status, jobLocation, jobType)"
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    { company, position, status, jobLocation, jobType },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new BadRequestError(`No job with id ${req.params.id}`);
  }

  return res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findOneAndRemove({ _id: id, createdBy: req.user.id });

  if (!job) {
    throw new BadRequestError(`No job with id ${id}`);
  }

  return res.status(StatusCodes.OK).json({ msg: "Success! Job deleted", job });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new ObjectId(req.user.id) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new ObjectId(req.user.id) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM YYYY");

      return { date, count };
    })
    .reverse();

  const defaultStats = {
    interview: stats.interview || 0,
    pending: stats.pending || 0,
    declined: stats.declined || 0,
  };

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
};
