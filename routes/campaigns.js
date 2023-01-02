import express from "express";
import { Campaign } from "../models/campaign.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const { firstName, bio, campaign, votes, matricule, age, sex, image } =
    req.body;
  const campaignInstance = new Campaign({
    firstName,
    bio,
    campaign,
    votes,
    matricule,
    age,
    sex,
    image,
  });
  try {
    await campaignInstance.save();
    res.send("saved campaigned sucessfully!!").status(200);
  } catch (error) {
    res.json({ message: error });
  }
});
export default router;
