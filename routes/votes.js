import express from "express";
import { addVote } from "../controllers/votes.js";
import { verifyUserToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//add vote
router.post("/", verifyUserToken, addVote);

export default router;
