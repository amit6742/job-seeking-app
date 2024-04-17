import express from "express";
import { getAllJob, postJob } from "../controllers/jobController.js";
import { isAuthorized} from "../middlewares/auth.js"

const router = express.Router();
router.get("/getall", getAllJob )
router.post("/post", isAuthorized, postJob)
export default router;
