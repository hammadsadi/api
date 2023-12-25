import express from "express";
import authVerify from "../middlewares/authVerify.js";
import {
  createAbout,
  deleteAbout,
  getAllAbout,
  updateAboutStatus,
} from "../controllers/aboutControllers.js";
import { aboutPhoto } from "../util/multerForCloud.js";
import { updateAbout } from "../controllers/aboutControllers.js";

// Init Route
const router = express.Router();
// router.use(authVerify);

/**
 * @Name About Route
 */

// Get All User
router.post("/", aboutPhoto, authVerify, createAbout);
router.get("/", getAllAbout);
router.delete("/:id", authVerify, deleteAbout);
router.put("/update-about/:id", aboutPhoto, authVerify, updateAbout);
router.patch("/update-about/:id", aboutPhoto, authVerify, updateAbout);
router.put("/status/:id", authVerify, updateAboutStatus);
router.patch("/status/:id", authVerify, updateAboutStatus);

// Export
export default router;
