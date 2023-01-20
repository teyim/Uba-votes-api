import { Campaign } from "../models/campaign.js";

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.json({ message: error });
  }
};

export const addCampaign = async (req, res) => {
  const { name, desc, startTime, endTime, votingPositions, candidates } =
    req.body;
  const candidateInstance = new Campaign({
    name,
    desc,
    startTime,
    endTime,
    votingPositions,
    candidates,
  });
  try {
    await candidateInstance.save();
    res.send("campaign saved sucessfully!!");
  } catch (error) {
    res.json({ message: error });
  }
};

export const getCampaign = async (req, res) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Campaign.findById(campaignId);
    res.json(campaign);
  } catch (error) {
    res.json({ message: error });
  }
};

export const deleteCampaign = async (req, res) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Candidate.remove({ _id: campaignId });
    res.json(campaign);
  } catch (error) {
    res.json({ message: error });
  }
};

export const updateCampaign = async (req, res) => {
  const { campaignId } = req.params;
  const { name, desc, startTime, endTime, votingPositions, candidates } =
    req.body;
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
        },
      }
    );
    res.json(updatedCampaign);
  } catch (error) {
    res.json({ message: error });
  }
};
