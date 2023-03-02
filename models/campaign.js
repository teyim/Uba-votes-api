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
  votes: {
    type: Number,
  },
});

const votingPostionSchema = new Schema({
  abbrv: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  candidates: { type: [candidateSchema], required: true },
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
  allowedDepartment: {
    type: String,
    require: true,
  },
  allowedSchool: {
    type: String,
    require: true,
  },
  allowedLevel: {
    type: Number,
    min: 200,
    max: 700,
    require: true,
  },
  votingPositions: [votingPostionSchema],
});

export const Campaign = mongoose.model("campaigns", campaignSchema);
