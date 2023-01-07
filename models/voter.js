import mongoose, { Schema } from "mongoose";

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
  campaigns: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Voter = mongoose.model("voters", voterSchema);
