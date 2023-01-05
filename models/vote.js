import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema({
  voterId: {
    type: String,
    required: true,
  },
  candidateId: {
    type: String,
    required: true,
  },
  campaignId: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
});

export const Vote = mongoose.model("votes", voteSchema);
