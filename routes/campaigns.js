import express from "express";
import {
  addCampaign,
  deleteCampaign,
  getAllCampaigns,
  getAllUserCampaigns,
  getCampaign,
  updateCampaign,
  getCampaignResult,
} from "../controllers/campaigns.js";
import {
  verifyAdminToken,
  verifyUserToken,
} from "../middlewares/verifyToken.js";
const router = express.Router();


//get all campaigns
router.get("/", verifyAdminToken, getAllCampaigns);

//get all campaigns by user
router.get("/:voterId", verifyUserToken, getAllUserCampaigns);

//add campaign
router.post("/", verifyAdminToken, addCampaign);

//get specific campaign
router.get("/:campaignId", verifyUserToken, getCampaign);
//
router.get("/:campaignId/result", verifyUserToken, getCampaignResult);

//delete specifc campaign
router.delete("/:campaignId", deleteCampaign);

//update Campaign Info
router.patch("/:campaignId", updateCampaign);

export default router;
