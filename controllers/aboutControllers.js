import About from "../models/About.js";
import expressAsyncHandler from "express-async-handler";
import { cloudPhotoDelete, photoUploadToCloud } from "../util/cloudUpload.js";
import { getPublicId } from "../helper/helper.js";

/**
 * @Desc Get About
 * @Method Get
 * @Access Private
 */
export const getAllAbout = expressAsyncHandler(async (req, res) => {
  let abouts = await About.find();
  // Validation
  if (!abouts.length > 0) {
    return res.status(404).json({ message: "About Not Found" });
  }

  res.status(200).json({ abouts, message: "About Get Successful" });
});

/**
 * @Desc Create About
 * @Method POST
 * @Access Private
 */
export const createAbout = expressAsyncHandler(async (req, res) => {
  const { title, desc } = req.body;

  // Validation
  if (!req.file || !desc) {
    return res.status(400).json({ message: "All Filed is Required" });
  }

  //   Upload Photo to Cloud
  let photoUp = await photoUploadToCloud(req.file.path);
  let about = await About.create({ title, desc, photo: photoUp.secure_url });
  res.status(200).json({ about, message: "About Created Successful" });
});

/**
 * @Desc Delete About
 * @Method Delete
 * @Access Private
 */
export const deleteAbout = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // Delete Photo from DB
  let deleteAbout = await About.findByIdAndDelete(id);
  //   Delete Photo from Cloud
  await cloudPhotoDelete(getPublicId(deleteAbout.photo));
  res.status(200).json({ deleteAbout, message: "About Deleted Successful" });
});

/**
 * @Desc Update About
 * @Method Delete
 * @Access Private
 */
export const updateAbout = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  // Update About Status
  let aboutUpdate = await About.findById(id);

  // About Photo
  let aboutPhto = aboutUpdate.photo;
  if (req.file) {
    let photoUpLink = await photoUploadToCloud(req.file.path);
    aboutPhto = photoUpLink.secure_url;
    //   Delete Photo from Cloud
    await cloudPhotoDelete(getPublicId(aboutUpdate.photo));
  }

  // Edit Title
  let editTitle = aboutUpdate.title;
  if (title) {
    editTitle = title;
  }

  // Edit Desc
  let editDesc = aboutUpdate.desc;
  if (desc) {
    editDesc = desc;
  }

  aboutUpdate.title = editTitle;
  aboutUpdate.desc = editDesc;
  aboutUpdate.photo = aboutPhto;
  aboutUpdate.save();

  res
    .status(200)
    .json({ about: aboutUpdate, message: "About Updated Successful" });
});

/**
 * @Desc Update About Status
 * @Method Delete
 * @Access Private
 */
export const updateAboutStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update About Status
  const statusAbout = await About.findByIdAndUpdate(
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
    .json({ status: statusAbout, message: "Status Updated Successful" });
});
