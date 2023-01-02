import express from "express";
import { Candidate } from "../models/candidate.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const { firstName, bio, campaign, votes, matricule, age, sex, image } =
    req.body;
  const candidateInstance = new Candidate({
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
    await candidateInstance.save();
    res.send("candidate saved sucessfully!!").status(200);
  } catch (error) {
    res.json({ message: error });
  }
});
export default router;
