import express from "express";
import authVerify from "../middlewares/authVerify.js";
import {
  createService,
  deleteService,
  getAllService,
  updateServiceStatus,
  updateService,
} from "../controllers/servicesControllers.js";
import { service_Photo } from "../util/multerForCloud.js";

// Init Route
const router = express.Router();
// router.use(authVerify);

/**
 * @Name Service Route
 */

// Get All User
router.post("/", service_Photo, authVerify, createService);
router.get("/", getAllService);
router.delete("/:id", authVerify, deleteService);
router.put("/update-Service/:id", service_Photo, authVerify, updateService);
router.patch("/update-Service/:id", service_Photo, authVerify, updateService);
router.put("/status/:id", authVerify, updateServiceStatus);
router.patch("/status/:id", authVerify, updateServiceStatus);

// Export
export default router;
