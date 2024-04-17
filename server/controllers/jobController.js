import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const getAllJob = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({
    expired: false,
  });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job seeker is not allowed this resources", 400)
    );
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("please provide full job details!", 400));
  }
  if ((!salaryTo || !salaryFrom) && !fixedSalary) {
    return next(
      new ErrorHandler("please either provide fixed salary or ranged salary")
    );
  }
  if (salaryTo && salaryFrom && fixedSalary) {
    return next(
      new ErrorHandler("please either provide fixed salary or ranged salary")
    );
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });

  res.status(200).json({
    success:true,
    message:"job posted successfully",
    job
  })


});
