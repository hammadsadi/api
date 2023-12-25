import express from "express";
import authVerify from "../middlewares/authVerify.js";
import {
  createHeader,
  deleteHeader,
  getAllHeader,
  updateHeaderStatus,
  updateHeader,
} from "../controllers/headerControllers.js";

// Init Route
const router = express.Router();
// router.use(authVerify);

/**
 * @Name Header Route
 */

// Get All User
router.post("/", authVerify, createHeader);
router.get("/", getAllHeader);
router.delete("/:id", authVerify, deleteHeader);
router.put("/update-header/:id", authVerify, updateHeader);
router.patch("/update-header/:id", authVerify, updateHeader);
router.put("/status/:id", authVerify, updateHeaderStatus);
router.patch("/status/:id", authVerify, updateHeaderStatus);

// Export
export default router;
