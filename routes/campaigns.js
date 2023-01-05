import express from "express";
import { Campaign } from "../models/campaign.js";
const router = express.Router();

//get all campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.json({ message: error });
  }
});

//add campaign
router.post("/", async (req, res) => {
  const { name, desc, startTime, endTime, votingPositions } = req.body;
  const candidateInstance = new Campaign({
    name,
    desc,
    startTime,
    endTime,
    votingPositions,
  });
  try {
    await candidateInstance.save();
    res.send("campaign saved sucessfully!!");
  } catch (error) {
    res.json({ message: error });
  }
});

//get specific campaign
router.get("/:campaignId", async (req, res) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Campaign.findById(campaignId);
    res.json(campaign);
  } catch (error) {
    res.json({ message: error });
  }
});

//delete specifc campaign
router.delete("/:campaignId", async (req, res) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Candidate.remove({ _id: campaignId });
    res.json(campaign);
  } catch (error) {
    res.json({ message: error });
  }
});

//update Campaign Info
router.patch("/:campaignId", async (req, res) => {
  const { campaignId } = req.params;
  const { name, desc, startTime, endTime, votingPositions } = req.body;
  try {
    const updatedCampaign = await Campaign.updateOne(
      { _id: campaignId },
      {
        $set: {
          name,
          desc,
          startTime,
          endTime,
          votingPositions,
        },
      }
    );
    res.json(updatedCampaign);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
