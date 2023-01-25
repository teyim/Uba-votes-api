import { Campaign } from "../models/campaign.js";
import { Voter } from "../models/voter.js";

export const addVote = async (req, res) => {
  const { voterId, candidates, campaignId } = req.body;

  try {
    const voter = await Voter.findById(voterId);

    if (!voter) {
      return res.status(404).send("Voter not found");
    }

    const hasVoted = voter?.votes?.some(
      (vote) => vote?.campaignId === campaignId
    );

    if (hasVoted) {
      return res
        .status(400)
        .send("Voter has already casted vote for this campaign");
    }

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

    candidates?.forEach((candidateId) => {
      voter?.votes?.push({ candidateId: candidateId, campaignId: campaignId });
    });

    const updatedVoter = await voter.save();

    res.send(updatedVoter);
  } catch (error) {
    res.json({ message: error });
  }
};
