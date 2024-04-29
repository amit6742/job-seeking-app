import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import { Job } from "../models/jobSchema.js";

export const employerGetApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job seeker is not allowed this resources", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const JobSeekerGetApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Job seeker is not allowed this resources", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Job seeker is not allowed this resources", 400)
      );
    }
    const { id } = req.user;
    const applications = await Application.findById(id);
    if (!applications) {
      return next(new ErrorHandler("oops application not found", 404));
    }
    await applications.deleteOne();

    res.status(200).json({
      success: true,
      message: "application deleted successfully",
      applications,
    });
  }
);

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer is not allowed this resources", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume file required", 400));
  }
  const { resume } = req.files;
  console.log(resume);
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Invalid file type", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );
  console.log(cloudinaryResponse);

  if (!cloudinaryResponse || !cloudinaryResponse.error) {
    console.error(
      "cloudinary Error",
      cloudinaryResponse.error || "unknown error"
    );
    return next(new ErrorHandler("invalid to file upload resume", 500));
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body;
  console.log(name, email, coverLetter, phone, address, jobId)
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };
  console.log(applicantID)
  if (!jobId) {
    return next(new ErrorHandler("Job not found", 404));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found", 404));
  }
  console.log(applicantID)

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  console.log(employerID)
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }
  console.log(employerID)
  const application = await Application.create({
    
    applicantID,
    employerID,
    name,
    email,
    coverLetter,
    phone,
    address,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    
  });
  console.log("name",  applicantID,
  employerID,
  name,
  email,
  coverLetter,
  phone,
  address, )
  res.status(200).json({
    success: true,
    message: "Application submitted successfully",
    application,
  });
});
