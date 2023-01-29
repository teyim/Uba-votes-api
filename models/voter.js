import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema({
  candidateId: {
    type: String,
    required: true,
  },
  campaignId: {
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
  level: {
    type: Number,
    min: 200,
    max: 700,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  votes: [voteSchema],
  password: {
    type: String,
    required: true,
  },
});

export const Voter = mongoose.model("voters", voterSchema);
