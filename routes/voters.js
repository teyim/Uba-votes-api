import express from "express";
import { registerVoter, voterLogin } from "../controllers/voters.js";

const router = express.Router();

//regiter voter
router.post("/register", registerVoter);

//login voter
router.post("/login", voterLogin);

export default router;
