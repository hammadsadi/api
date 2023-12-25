import Banner from "../models/Banner.js";
import expressAsyncHandler from "express-async-handler";
import { cloudPhotoDelete, photoUploadToCloud } from "../util/cloudUpload.js";
import { getPublicId } from "../helper/helper.js";

/**
 * @Desc Get Banner
 * @Method Get
 * @Access Private
 */
export const getAllBanner = expressAsyncHandler(async (req, res) => {
  let banners = await Banner.find();
  // Validation
  if (!banners.length > 0) {
    return res.status(404).json({ message: "Banner Not Found" });
  }

  res.status(200).json({ banners, message: "Banner Get Successful" });
});

/**
 * @Desc Create Banner
 * @Method POST
 * @Access Private
 */
export const createBanner = expressAsyncHandler(async (req, res) => {
  // Validation
  if (!req.file) {
    return res.status(400).json({ message: "Banner Filed is Required" });
  }

  //   Upload Photo to Cloud
  let photoUp = await photoUploadToCloud(req.file.path);
  let banner = await Banner.create({ photo: photoUp.secure_url });
  res.status(200).json({ banner, message: "Banner Created Successful" });
});

/**
 * @Desc Delete Banner
 * @Method Delete
 * @Access Private
 */
export const deleteBanner = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // Delete Photo from DB
  let deletePhoto = await Banner.findByIdAndDelete(id);
  //   Delete Photo from Cloud
  await cloudPhotoDelete(getPublicId(deletePhoto.photo));
  res.status(200).json({ deletePhoto, message: "Banner Deleted Successful" });
});

/**
 * @Desc Update Banner Status
 * @Method Delete
 * @Access Private
 */
export const updateBannerStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update Banner Status
  const statusBanner = await Banner.findByIdAndUpdate(
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
    .json({ status: statusBanner, message: "Status Updated Successful" });
});
