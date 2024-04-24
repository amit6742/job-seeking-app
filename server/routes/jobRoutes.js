import express from "express";
import { deleteJob, getAllJob, getSinglejob, getmyJobs, postJob, updateJob } from "../controllers/jobController.js";
import { isAuthorized} from "../middlewares/auth.js"

const router = express.Router();
router.get("/getall",isAuthorized, getAllJob )
router.post("/post", isAuthorized, postJob)
router.get("/getmyjobs", isAuthorized, getmyJobs)
router.put("/update/:id", isAuthorized, updateJob)
router.delete("/delete/:id", isAuthorized, deleteJob)
router.get("/:id", isAuthorized, getSinglejob)
export default router;
