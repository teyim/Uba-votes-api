import express from "express";
import {
  addVotingPosition,
  deleteVotingPosition,
  updateVotingPosition,
} from "../controllers/votingPositions.js";
import { verifyAdminToken } from "../middlewares/verifyToken.js";
const router = express.Router();

//add candidate
router.post("/:campaignId", verifyAdminToken, addVotingPosition);

//get specific candidate
// router.get("/:candidateId", getCandidate);

//delete specifc candidate
router.delete(
  "/:campaignId/:votingPostionId",
  verifyAdminToken,
  deleteVotingPosition
);

//update Candidate Info
router.patch(
  "/:campaignId/:votingPostionId",
  verifyAdminToken,
  updateVotingPosition
);

export default router;
