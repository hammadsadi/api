import express from "express";
import authVerify from "../middlewares/authVerify.js";
import {
  createTechnology,
  deleteTechnology,
  getAllTechnology,
  updateTechnologyStatus,
  updateTechnology,
} from "../controllers/technologyControllers.js";
import { technology_Photo } from "../util/multerForCloud.js";

// Init Route
const router = express.Router();
// router.use(authVerify);

/**
 * @Name Technology Route
 */

// Get All User
router.post("/", technology_Photo, authVerify, createTechnology);
router.get("/", getAllTechnology);
router.delete("/:id", authVerify, deleteTechnology);
router.put(
  "/update-technology/:id",
  technology_Photo,
  authVerify,
  updateTechnology
);
router.patch(
  "/update-technology/:id",
  technology_Photo,
  authVerify,
  updateTechnology
);
router.put("/status/:id", authVerify, updateTechnologyStatus);
router.patch("/status/:id", authVerify, updateTechnologyStatus);

// Export
export default router;
