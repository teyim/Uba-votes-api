import express from "express";
import { addVote, getVotes } from "../controllers/votes.js";
import {
  verifyAdminToken,
  verifyUserToken,
} from "../middlewares/verifyToken.js";

const router = express.Router();

//get all votes
router.get("/", verifyAdminToken, getVotes);

//add vote
router.post("/", verifyUserToken, addVote);

//get results for specific campiagn..show results only if campaign has ended
router.get(":/results", () => {});

export default router;
