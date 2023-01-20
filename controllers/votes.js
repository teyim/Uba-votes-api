import { Vote } from "../models/vote.js";

export const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (error) {
    res.json({ message: error });
  }
};

export const addVote = async (req, res) => {
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
};
