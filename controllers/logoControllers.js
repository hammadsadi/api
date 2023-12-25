import Logo from "../models/Logo.js";
import expressAsyncHandler from "express-async-handler";
import { cloudPhotoDelete, photoUploadToCloud } from "../util/cloudUpload.js";
import { createSlug, getPublicId } from "../helper/helper.js";

/**
 * @Desc Get Logo
 * @Method Get
 * @Access Private
 */
export const getAllLogo = expressAsyncHandler(async (req, res) => {
  let logos = await Logo.find();
  // Validation
  if (!logos.length > 0) {
    return res.status(404).json({ message: "Logo Not Found" });
  }

  res.status(200).json({ logos, message: "Logo Get Successful" });
});

/**
 * @Desc Create Logo
 * @Method POST
 * @Access Private
 */
export const createLogo = expressAsyncHandler(async (req, res) => {
  // Validation
  if (!req.file) {
    return res.status(400).json({ message: "Logo Filed is Required" });
  }

  // Photo Manage
  let logoImage = null;
  if (req.file) {
    //   Upload Photo to Cloud
    let photoUp = await photoUploadToCloud(req.file.path);
    logoImage = photoUp.secure_url;
  }

  let logo = await Logo.create({
    photo: logoImage,
  });
  res.status(200).json({ logo, message: "Logo Created Successful" });
});

/**
 * @Desc Delete Logo
 * @Method Delete
 * @Access Private
 */
export const deleteLogo = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // Delete Photo from DB
  let deletePhoto = await Logo.findByIdAndDelete(id);
  //   Delete Photo from Cloud
  if (deletePhoto.photo) {
    await cloudPhotoDelete(getPublicId(deletePhoto.photo));
  }
  res.status(200).json({ deletePhoto, message: "Logo Deleted Successful" });
});

/**
 * @Desc Update Logo
 * @Method Delete
 * @Access Private
 */
export const updateLogo = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  // Update Logo Status
  let logoUpdate = await Logo.findById(id);

  // Logo Photo
  let logoPhto = logoUpdate.photo;
  if (req.file) {
    let photoUpLink = await photoUploadToCloud(req.file.path);
    logoPhto = photoUpLink.secure_url;
    //   Delete Photo from Cloud
    await cloudPhotoDelete(getPublicId(logoUpdate.photo));
  }

  logoUpdate.photo = logoPhto;
  logoUpdate.save();

  res.status(200).json({
    Logo: logoUpdate,
    message: "Logo Updated Successful",
  });
});

/**
 * @Desc Update Logo Status
 * @Method Delete
 * @Access Private
 */
export const updateLogoStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update Logo Status
  const statusLogo = await Logo.findByIdAndUpdate(
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
    .json({ status: statusLogo, message: "Status Updated Successful" });
});
