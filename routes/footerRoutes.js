import express from "express";
import authVerify from "../middlewares/authVerify.js";
import {
  createFooter,
  deleteFooter,
  getAllFooter,
  updateFooterStatus,
  updateFooter,
} from "../controllers/footerController.js";

// Init Route
const router = express.Router();
// router.use(authVerify);

/**
 * @Name Footer Route
 */

// Get All User
router.post("/", authVerify, createFooter);
router.get("/", getAllFooter);
router.delete("/:id", authVerify, deleteFooter);
router.put("/update-footer/:id", authVerify, updateFooter);
router.patch("/update-footer/:id", authVerify, updateFooter);
router.put("/status/:id", authVerify, updateFooterStatus);
router.patch("/status/:id", authVerify, updateFooterStatus);

// Export
export default router;
