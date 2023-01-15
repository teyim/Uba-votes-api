import mongoose from "mongoose";
import { Schema } from "mongoose";

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
  votingPositions: [String],
  candidates: [
    {
      fullName: {
        type: String,
        required: true,
      },
      bio: {
        type: String,
        required: true,
      },
      campaign: {
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
    },
  ],
});

export const Campaign = mongoose.model("campaigns", campaignSchema);
