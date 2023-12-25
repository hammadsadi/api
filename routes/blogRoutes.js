import express from "express";
import authVerify from "../middlewares/authVerify.js";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  updateBlogStatus,
  updateBlog,
} from "../controllers/blogControllers.js";
import { blog_Photo } from "../util/multerForCloud.js";

// Init Route
const router = express.Router();
// router.use(authVerify);

/**
 * @Name Blog Route
 */

// Get All User
router.post("/", blog_Photo, authVerify, createBlog);
router.get("/", getAllBlog);
router.delete("/:id", authVerify, deleteBlog);
router.put("/update-blog/:id", blog_Photo, authVerify, updateBlog);
router.patch("/update-blog/:id", blog_Photo, authVerify, updateBlog);
router.put("/status/:id", authVerify, updateBlogStatus);
router.patch("/status/:id", authVerify, updateBlogStatus);

// Export
export default router;
