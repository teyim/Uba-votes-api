import mongoose from "mongoose";
import { Schema } from "mongoose";

const candidateSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  matricule: {
    type: String,
    minLength: 10,
    maxLength: 10,
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
  },
});

const votingPostionsSchema = new Schema({
  abbrv: String,
  name: String,
});

const campaignSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  votingPositions: [votingPostionsSchema],
  candidates: [candidateSchema],
});

export const Campaign = mongoose.model("campaigns", campaignSchema);
