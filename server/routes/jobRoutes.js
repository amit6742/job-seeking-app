import express from "express";
import { getAllJob, getmyJobs, postJob, updateJob } from "../controllers/jobController.js";
import { isAuthorized} from "../middlewares/auth.js"

const router = express.Router();
router.get("/getall", getAllJob )
router.post("/post", isAuthorized, postJob)
router.get("/getmyjobs", isAuthorized, getmyJobs)
router.put("/update/:id", isAuthorized, updateJob)
export default router;
