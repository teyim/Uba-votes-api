import express from "express";
import { Vote } from "../models/vote.js";
const router = express.Router();

//get all votes
router.get("/", async (req, res) => {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (error) {
    res.json({ message: error });
  }
});

//add vote
router.post("/", async (req, res) => {
  const { voterId, candidateId, campaignId, position } = req.body;
  const voteInstance = new Vote({
    voterId,
    candidateId,
    campaignId,
    position,
  });
  try {
    await voteInstance.save();
    res.send("vote added sucessfully!!");
  } catch (error) {
    res.json({ message: error });
  }
});

//get results for specific campiagn..show results only if campaign has ended
router.get(":/results", () => {});

export default router;
