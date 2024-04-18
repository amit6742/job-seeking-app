import express from "express";
import {employerGetApplications, jobSeekerDeleteApplication, JobSeekerGetApplications, postApplication} from "../controllers/applicationController.js"
import { isAuthorized } from "../middlewares/auth.js";


const router = express.Router();
router.get("/jobseeker/getall",isAuthorized,  JobSeekerGetApplications)
router.get("/employer/getall",isAuthorized, employerGetApplications)
router.delete("/delete/:id", isAuthorized, jobSeekerDeleteApplication)
router.post("/post", isAuthorized, postApplication)

export default router;
