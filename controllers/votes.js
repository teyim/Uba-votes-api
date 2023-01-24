import { Schema } from "mongoose";
import { Campaign } from "../models/campaign.js";
import { Voter } from "../models/voter.js";

export const addVote = async (req, res) => {
  const { voterId, candidates, campaignId } = req.body;

  try {
    await Voter.findById(voterId, function (err, result) {
      if (!err) {
        if (!result) {
          res.status(404).send("Voter was not found");
        } else {
          const hasVoted = result.votes.some(
            (votes) => votes.campaignId === campaignId
          );
          if (hasVoted)
            return res
              .status(400)
              .send("user has already voted for this campaign");
        }
      }
    });

    const response = await Campaign.updateMany(
      { _id: campaignId, "candidates._id": { $in: candidates } },
      {
        $inc: {
          "candidates.$[].votes": 1,
        },
      }
    );
    if (!response?.acknowledged) {
      return res.status(400).send("error update votes");
    }
    const voter = await Voter.findOne({ _id: voterId });
    candidates.forEach((candidateId) => {
      voter.push({ candidateId, campaignId });
    });
    const updatedVoter = await voter.save();
    res.send(updatedVoter);
  } catch (error) {
    res.json({ message: error });
  }
};
