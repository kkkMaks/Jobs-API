const express = require("express");
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} = require("../controllers/jobs");
const { testUser } = require("../middleware");

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/stats").get(showStats);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
