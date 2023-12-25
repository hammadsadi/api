import express from "express";
import authVerify from "../middlewares/authVerify.js";
import {
  createLogo,
  deleteLogo,
  getAllLogo,
  updateLogoStatus,
  updateLogo,
} from "../controllers/logoControllers.js";
import { logo_Photo } from "../util/multerForCloud.js";

// Init Route
const router = express.Router();
// router.use(authVerify);

/**
 * @Name Logo Route
 */

// Get All User
router.post("/", logo_Photo, authVerify, createLogo);
router.get("/", getAllLogo);
router.delete("/:id", authVerify, deleteLogo);
router.put("/update-logo/:id", logo_Photo, authVerify, updateLogo);
router.patch("/update-logo/:id", logo_Photo, authVerify, updateLogo);
router.put("/status/:id", authVerify, updateLogoStatus);
router.patch("/status/:id", authVerify, updateLogoStatus);

// Export
export default router;
