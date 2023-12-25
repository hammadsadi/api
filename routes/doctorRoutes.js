import express from "express";
import authVerify from "../middlewares/authVerify.js";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctor,
  updateDoctorStatus,
  updateDoctor,
} from "../controllers/doctorControllers.js";
import { doctor_Photo } from "../util/multerForCloud.js";

// Init Route
const router = express.Router();
// router.use(authVerify);

/**
 * @Name Doctor Route
 */

// Get All User
router.post("/", doctor_Photo, authVerify, createDoctor);
router.get("/", getAllDoctor);
router.delete("/:id", authVerify, deleteDoctor);
router.put("/update-doctor/:id", doctor_Photo, authVerify, updateDoctor);
router.patch("/update-doctor/:id", doctor_Photo, authVerify, updateDoctor);
router.put("/status/:id", authVerify, updateDoctorStatus);
router.patch("/status/:id", authVerify, updateDoctorStatus);

// Export
export default router;
