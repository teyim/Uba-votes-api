import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const app = express();

//Import routes
import candidates from "./routes/candidates.js";
import campaigns from "./routes/campaigns.js";
import votes from "./routes/votes.js";
import voters from "./routes/voters.js";
import admin from "./routes/admin.js";
import votingPositions from "./routes/votingPositions.js";

//middlewares
app.use(bodyParser.json());
app.use(cors());

app.use("/candidate", candidates);
app.use("/campaigns", campaigns);
app.use("/position", votingPositions);
app.use("/vote", votes);
app.use("/voter", voters);
app.use("/admin", admin);

// routes
app.get("/", (req, res) => {
  res.send("I am home");
});

// database
const database = () => {
  mongoose.set("strictQuery", false);

  mongoose.connect(process.env.DB_CONNECTION);
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Error connecting to db"));

  db.once("open", function () {
    console.log("connected to DB");
  });
};

database();

app.listen(3001);
