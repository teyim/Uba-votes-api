import express from "express";
import {
  addCampaign,
  deleteCampaign,
  getAllCampaigns,
  getCampaign,
  updateCampaign,
} from "../controllers/campaigns.js";
const router = express.Router();

//get all campaigns
router.get("/", verifyUserToken, getAllCampaigns);

//add campaign
router.post("/", verifyAdminToken, addCampaign);

//get specific campaign
router.get("/:campaignId", getCampaign);

//delete specifc campaign
router.delete("/:campaignId", deleteCampaign);

//update Campaign Info
router.patch("/:campaignId", updateCampaign);

export default router;
