import express from "express";
import { Candidate } from "../models/candidate.js";
const router = express.Router();

//get all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.json({ message: error });
  }
});

//add candidate
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

//get specific candidate
router.get("/:candidateId", async (req, res) => {
  const { candidateId } = req.params;
  try {
    const candidate = await Candidate.findById(candidateId);
    res.json(candidate);
  } catch (error) {
    res.json({ message: error });
  }
});

//delete specifc candidate
router.delete("/:candidateId", async (req, res) => {
  const { candidateId } = req.params;
  try {
    const candidate = await Candidate.remove({ _id: candidateId });
    res.json(candidate);
  } catch (error) {
    res.json({ message: error });
  }
});

//update Candidate Info
router.patch("/:candidateId", async (req, res) => {
  const { candidateId } = req.params;
  const { bio, fullName } = req.body;
  try {
    const updatedCandidates = await Candidate.updateOne(
      { _id: candidateId },
      { $set: { bio: bio, fullName: fullName } }
    );
    res.json(updatedCandidates);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
