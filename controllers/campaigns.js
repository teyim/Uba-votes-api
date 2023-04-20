import mongoose from "mongoose";
import { Campaign } from "../models/campaign.js";
import { Voter } from "../models/voter.js";

const currentDateAndTime = new Date().toISOString();

export const getAllUserCampaigns = async (req, res) => {
  const { voterId } = req.params;
  try {
    //find campaign
    const campaigns = await Campaign.find();
    //find voter
    const voter = await Voter.findById(voterId);
    if (!voter) {
      return res.status(404).send("Voter not found");
    }

    const filteredCampaigns = campaigns.filter(
      (campaign) =>
        (campaign?.allowedSchool === voter?.school &&
          campaign?.allowedDepartment === voter?.department &&
          campaign?.allowedLevel === voter?.level) ||
        (campaign?.allowedSchool === "All" &&
          campaign?.allowedDepartment === "All" &&
          campaign?.allowedLevel === 111)
    );

    res.json(filteredCampaigns);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    //find campaigns
    const campaigns = await Campaign.find();

    res.json(campaigns);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const addCampaign = async (req, res) => {
  const {
    name,
    desc,
    startTime,
    endTime,
    votingPositions,
    candidates,
    allowedDepartment,
    allowedSchool,
    allowedLevel,
  } = req.body;
  const candidateInstance = new Campaign({
    name,
    desc,
    startTime,
    endTime,
    votingPositions,
    candidates,
    allowedDepartment,
    allowedSchool,
    allowedLevel,
  });
  try {
    await candidateInstance.save();
    res.send({ message: "campaign saved sucessfully!!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getCampaign = async (req, res) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Campaign.findById(campaignId);
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getCampaignResult = async (req, res) => {
  const { campaignId } = req.params;

  const campaignObjectId = mongoose.Types.ObjectId(campaignId);
  try {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).send("Campaign not found");
    }

    //check if voting for campaign has expired or has started
    if (!currentDateAndTime > campaign.endTime)
      return res.status(400).send("Voting is still ongoing");
    if (currentDateAndTime < campaign.startTime)
      return res
        .status(400)
        .send(
          "voting for this campaign has not yet started.results can only be seen after voting"
        );

    // campaign results aggregation pipeline
    const pipeline = [
      { $match: { _id: campaignObjectId } },
      { $unwind: "$votingPositions" },
      { $unwind: "$votingPositions.candidates" },
      { $sort: { "votingPositions.candidates.votes": -1 } },
      {
        $group: {
          _id: "$votingPositions._id",
          positionName: { $first: "$votingPositions.name" },
          candidateName: { $first: "$votingPositions.candidates.fullName" },
          candidateImg: { $first: "$votingPositions.candidates.image" },
          votes: { $first: "$votingPositions.candidates.votes" },
        },
      },
    ];

    //get campaign results
    const results = await Campaign.aggregate(pipeline);

    if (!results) {
      return res.status(404).send("results not found");
    }

    res.json(results);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteCampaign = async (req, res) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Campaign.deleteOne({ _id: campaignId });
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateCampaign = async (req, res) => {
  const { campaignId } = req.params;
  const {
    name,
    desc,
    startTime,
    endTime,
    votingPositions,
    candidates,
    allowedDepartment,
    allowedSchool,
    allowedLevel,
  } = req.body;
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
          candidates,
          allowedDepartment,
          allowedSchool,
          allowedLevel,
        },
      }
    );
    res.json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
