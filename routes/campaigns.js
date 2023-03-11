import express from "express";
import {
  addCampaign,
  deleteCampaign,
  getAllCampaigns,
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
router.get("/", getAllCampaigns);

//add campaign
router.post("/", verifyAdminToken, addCampaign);

//get specific campaign
router.get("/:campaignId", getCampaign);
//
router.get("/:campaignId/result", verifyUserToken, getCampaignResult);

//delete specifc campaign
router.delete("/:campaignId", deleteCampaign);

//update Campaign Info
router.patch("/:campaignId", updateCampaign);

export default router;
