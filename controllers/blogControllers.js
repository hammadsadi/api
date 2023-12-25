import Blog from "../models/Blog.js";
import expressAsyncHandler from "express-async-handler";
import { cloudPhotoDelete, photoUploadToCloud } from "../util/cloudUpload.js";
import { createSlug, getPublicId } from "../helper/helper.js";

/**
 * @Desc Get Blog
 * @Method Get
 * @Access Private
 */
export const getAllBlog = expressAsyncHandler(async (req, res) => {
  let blogs = await Blog.find();
  // Validation
  if (!blogs.length > 0) {
    return res.status(404).json({ message: "Blog Not Found" });
  }

  res.status(200).json({ blogs, message: "Blog Get Successful" });
});

/**
 * @Desc Create Blog
 * @Method POST
 * @Access Private
 */
export const createBlog = expressAsyncHandler(async (req, res) => {
  const { title, shortDesc, longDesc } = req.body;

  // Validation
  if (!title || !shortDesc || !longDesc) {
    return res.status(400).json({ message: "All Filed is Required" });
  }

  const checkBlog = await Blog.findOne({ title });
  if (checkBlog) {
    return res.status(400).json({ message: "Blog Already Exist" });
  }

  // Photo Manage
  let blogImage = null;
  if (req.file) {
    //   Upload Photo to Cloud
    let photoUp = await photoUploadToCloud(req.file.path);
    blogImage = photoUp.secure_url;
  }

  let blog = await Blog.create({
    title,
    shortDesc,
    longDesc,
    slug: createSlug(title),
    photo: blogImage,
  });
  res.status(200).json({ blog, message: "Blog Created Successful" });
});

/**
 * @Desc Delete Blog
 * @Method Delete
 * @Access Private
 */
export const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // Delete Photo from DB
  let deletePhoto = await Blog.findByIdAndDelete(id);
  //   Delete Photo from Cloud
  if (deletePhoto.photo) {
    await cloudPhotoDelete(getPublicId(deletePhoto.photo));
  }
  res.status(200).json({ deletePhoto, message: "Blog Deleted Successful" });
});

/**
 * @Desc Update Blog
 * @Method Delete
 * @Access Private
 */
export const updateBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, shortDesc, longDesc } = req.body;

  // Update Blog Status
  let blogUpdate = await Blog.findById(id);

  // Blog Photo
  let blogPhto = blogUpdate.photo;
  if (req.file) {
    let photoUpLink = await photoUploadToCloud(req.file.path);
    blogPhto = photoUpLink.secure_url;
    //   Delete Photo from Cloud
    await cloudPhotoDelete(getPublicId(blogUpdate.photo));
  }

  // Blog Name
  let blogTitle = blogUpdate.title;
  if (title) {
    blogTitle = title;
  }

  // Blog Desc
  let blogShortDesc = blogUpdate.shortDesc;
  if (shortDesc) {
    blogShortDesc = shortDesc;
  }

  // Blog long Desc
  let blogLongDesc = blogUpdate.longDesc;
  if (longDesc) {
    blogLongDesc = longDesc;
  }

  blogUpdate.title = blogTitle;
  blogUpdate.shortDesc = blogShortDesc;
  blogUpdate.longDesc = blogLongDesc;
  blogUpdate.slug = createSlug(blogTitle);
  blogUpdate.photo = blogPhto;
  blogUpdate.save();

  res
    .status(200)
    .json({ blog: blogUpdate, message: "Blog Updated Successful" });
});

/**
 * @Desc Update Blog Status
 * @Method Delete
 * @Access Private
 */
export const updateBlogStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update Blog Status
  const statusBlog = await Blog.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json({ status: statusBlog, message: "Status Updated Successful" });
});
