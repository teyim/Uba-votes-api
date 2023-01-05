import express from "express";
import { Voter } from "../models/voter.js";
const router = express.Router();

//get all voters
router.get("/", async (req, res) => {
  try {
    const Voters = await Voter.find();
    res.json(Voters);
  } catch (error) {
    res.json({ message: error });
  }
});

//add voter
router.post("/", async (req, res) => {
  const { fullName, matricule, campaigns } = req.body;
  const voterInstance = new Voter({
    fullName,
    matricule,
    campaigns,
  });
  try {
    await voterInstance.save();
    res.send("voter added sucessfully!!");
  } catch (error) {
    res.json({ message: error });
  }
});

//get specific voter
router.get("/:voterId", async (req, res) => {
  const { voterId } = req.params;
  try {
    const voter = await Voter.findById(voterId);
    res.json(voter);
  } catch (error) {
    res.json({ message: error });
  }
});

//delete specifc voter
router.delete("/:voterId", async (req, res) => {
  const { voterId } = req.params;
  try {
    const voter = await Voter.remove({ _id: voterId });
    res.json(voter);
  } catch (error) {
    res.json({ message: error });
  }
});

//update Voter Info
router.patch("/:voterId", async (req, res) => {
  const { voterId } = req.params;
  const { fullName, matricule, campaigns } = req.body;
  try {
    const updatedVoter = await Voter.updateOne(
      { _id: voterId },
      {
        $set: {
          fullName,
          matricule,
          campaigns,
        },
      }
    );
    res.json(updatedVoter);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
