import express from "express";
import {
  deleteVoter,
  registerVoter,
  updateVoter,
  voterLogin,
} from "../controllers/voters.js";
import {
  verifyAdminToken,
  verifyUserToken,
} from "../middlewares/verifyToken.js";
const router = express.Router();

//regiter voter
router.post("/register", verifyAdminToken, registerVoter);

//login voter
router.post("/login", voterLogin);

//delete specifc voter
router.delete("/:voterId", verifyAdminToken, deleteVoter);

//update Voter Info
router.patch("/:voterId", verifyAdminToken, updateVoter);

export default router;
