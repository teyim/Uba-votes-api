import mongoose from "mongoose";
import { Schema } from "mongoose";

const campaignSchema = new Schema({
  fullName: String,
  bio: String,
  campaign: Number,
  votes: Number,
  matricule: {
    type: String,
    minLength: 10,
    maxLength: 10,
  },
  age: Number,
  sex: String,
  image: String,
});

export const Campaign = mongoose.model("campaigns", campaignSchema);
