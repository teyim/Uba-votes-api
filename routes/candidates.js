import express from "express";
import {
  addCandidate,
  deleteCandidate,
  getCandidate,
  updateCandidate,
} from "../controllers/candidates.js";
import { verifyAdminToken } from "../middlewares/verifyToken.js";
const router = express.Router();

//add candidate
router.post("/:campaignId", verifyAdminToken, addCandidate);

//get specific candidate
router.get("/:candidateId", getCandidate);

//delete specifc candidate
router.delete("/:candidateId", deleteCandidate);

//update Candidate Info
router.patch("/:candidateId", updateCandidate);

export default router;
