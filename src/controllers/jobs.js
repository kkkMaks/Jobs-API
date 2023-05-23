const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id }).sort("-createdAt");

  return res.status(200).json({ jobs });
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
  const { company, position, status } = req.body;
  const userId = req.user.id;

  if (!company || !position || !userId) {
    throw new BadRequestError("Please provide all required fields");
  }

  const job = await Job.create({
    company,
    position,
    status,
    createdBy: userId,
  });

  return res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { company, position, status } = req.body;

  if (!company && !position && !status) {
    throw new BadRequestError(
      "Please provide at least one field to update (company, position, status)"
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    { company, position, status },
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

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
