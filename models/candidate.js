import mongoose from "mongoose";
import { Schema } from "mongoose";

const candidateSchema = new Schema({
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

export const Candidate = mongoose.model("candidates", candidateSchema);
