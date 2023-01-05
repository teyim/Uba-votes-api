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
});

export const Campaign = mongoose.model("campaigns", campaignSchema);
