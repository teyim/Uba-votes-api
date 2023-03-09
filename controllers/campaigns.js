import { Campaign } from "../models/campaign.js";

const currentDateAndTime = new Date().toISOString();

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    const filteredCampaigns = campaigns.filter(
      (campaign) => campaign.endTime > currentDateAndTime
    );
    res.json(filteredCampaigns);
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
    res.send("campaign saved sucessfully!!");
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

export const deleteCampaign = async (req, res) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Candidate.remove({ _id: campaignId });
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
