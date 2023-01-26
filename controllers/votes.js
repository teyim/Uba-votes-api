import { Campaign } from "../models/campaign.js";
import { Voter } from "../models/voter.js";

const currentDateAndTime = new Date().toISOString();

export const addVote = async (req, res) => {
  const { voterId, candidates, campaignId } = req.body;

  try {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).send("Campaign not found");
    }

    //check if voting for campaign has expired or has started
    if (currentDateAndTime > campaign.endTime)
      return res.status(400).send("Voting for this campaign has closed");
    if (currentDateAndTime < campaign.startTime)
      return res
        .status(400)
        .send("voting for this campaign has not yet started");

    const voter = await Voter.findById(voterId);

    if (!voter) {
      return res.status(404).send("Voter not found");
    }

    const voterIsEligible = voter?.campaigns?.some(
      (voterCampaignId) => voterCampaignId === campaignId
    );

    if (!voterIsEligible) {
      return res
        .status(400)
        .send("Voter is not eligible to vote under campaign");
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
    res.status(400).json({ message: error });
  }
};
