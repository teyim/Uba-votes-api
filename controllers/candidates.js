import { Campaign } from "../models/campaign.js";

export const addCandidate = async (req, res) => {
  const { campaignId } = req.params;
  const { fullName, bio, matricule, age, sex, image, position } = req.body;
  const candidate = {
    fullName,
    bio,
    matricule,
    age,
    sex,
    image,
    position,
  };
  try {
    const campaign = await Campaign.findById(campaignId);
    campaign.candidates.push(candidate);

    await campaign.save();
    res.send("candidate saved sucessfully!!");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const getCandidate = async (req, res) => {
  const { candidateId, campaignId } = req.params;
  try {
    const candidate = await Campaign.findOne(
      { _id: ObjectId(campaignId) },
      { candidates: { $elemMatch: { _id: ObjectId(candidateId) } } }
    );
    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteCandidate = async (req, res) => {
  const { candidateId } = req.params;
  try {
    const candidate = await Candidate.remove({ _id: candidateId });
    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateCandidate = async (res, req) => {
  const { candidateId } = req.params;
  const { firstName, bio, campaign, votes, matricule, age, sex, image } =
    req.body;
  try {
    const updatedCandidates = await Candidate.updateOne(
      { _id: candidateId },
      {
        $set: {
          firstName,
          bio,
          campaign,
          votes,
          matricule,
          age,
          sex,
          image,
        },
      }
    );
    res.json(updatedCandidates);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
