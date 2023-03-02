import { Campaign } from "../models/campaign.js";

export const addVotingPosition = async (req, res) => {
  const { campaignId } = req.params;
  const { abbrv, name } = req.body;
  const votingPosition = {
    abbrv,
    name,
  };
  try {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).send("Campaign not found");
    }

    campaign?.votingPositions?.push(votingPosition);

    const results = await campaign.save();
    if (results) {
      return res.send("voting position added successfully!!");
    } else {
      return res.status(400).send("error occured adding voting position");
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
// export const getCandidate = async (req, res) => {
//   const { candidateId, campaignId } = req.params;
//   try {
//     const candidate = await Campaign.findOne(
//       { _id: ObjectId(campaignId) },
//       { candidates: { $elemMatch: { _id: ObjectId(candidateId) } } }
//     );
//     res.json(candidate);
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// };

export const deleteVotingPosition = async (req, res) => {
  const { candidateId } = req.params;
  try {
    const candidate = await Candidate.remove({ _id: candidateId });
    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateVotingPosition = async (res, req) => {
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
