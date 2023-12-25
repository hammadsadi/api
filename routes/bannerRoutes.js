import express from "express";
import authVerify from "../middlewares/authVerify.js";
import {
  createBanner,
  deleteBanner,
  getAllBanner,
  updateBannerStatus,
} from "../controllers/bannerControllers.js";
import { bannerPhoto } from "../util/multerForCloud.js";

// Init Route
const router = express.Router();
// router.use(authVerify);

/**
 * @Name Banner Route
 */

// Get All User
router.post("/", bannerPhoto, authVerify, createBanner);
router.get("/", getAllBanner);
router.delete("/:id", authVerify, deleteBanner);
router.put("/status/:id", authVerify, updateBannerStatus);
router.patch("/status/:id", authVerify, updateBannerStatus);

// Export
export default router;
