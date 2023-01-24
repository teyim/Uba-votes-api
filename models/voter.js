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

const voterSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  matricule: {
    type: String,
    minLength: 10,
    maxLength: 10,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  campaigns: [String],
  votes: [voteSchema],
  password: {
    type: String,
    required: true,
  },
});

export const Voter = mongoose.model("voters", voterSchema);
