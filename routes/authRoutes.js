import express from "express";
import {
  contactUser,
  createAuth,
  getLogedInUser,
  loginAuth,
  logoutUser,
} from "../controllers/authControllers.js";
import authVerify from "../middlewares/authVerify.js";

// Init Route
const router = express.Router();

/**
 * @Name User Route
 */

// Get All User
router.post("/", createAuth);
router.post("/mail", contactUser);
router.post("/login", loginAuth);
router.get("/me", authVerify, getLogedInUser);
router.get("/logout", logoutUser);

// Export
export default router;
