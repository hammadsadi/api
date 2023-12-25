import Footer from "../models/Footer.js";
import expressAsyncHandler from "express-async-handler";
import { cloudPhotoDelete, photoUploadToCloud } from "../util/cloudUpload.js";
import { createSlug, getPublicId } from "../helper/helper.js";

/**
 * @Desc Get Footer
 * @Method Get
 * @Access Private
 */
export const getAllFooter = expressAsyncHandler(async (req, res) => {
  let footers = await Footer.find();
  // Validation
  if (!footers.length > 0) {
    return res.status(404).json({ message: "Footer Not Found" });
  }

  res.status(200).json({ footers, message: "Footer Get Successful" });
});

/**
 * @Desc Create Footer
 * @Method POST
 * @Access Private
 */
export const createFooter = expressAsyncHandler(async (req, res) => {
  const {
    footerNumber,
    footerEmail,
    footerAddress,
    facebook,
    youtube,
    linkedin,
  } = req.body;

  // Validation
  if (
    !footerNumber ||
    !footerEmail ||
    !footerAddress ||
    !facebook ||
    !youtube ||
    !linkedin
  ) {
    return res.status(400).json({ message: "All Filed is Required" });
  }

  const checkFooter = await Footer.findOne({ footerEmail });
  if (checkFooter) {
    return res.status(400).json({ message: "Footer Already Exist" });
  }

  let footer = await Footer.create({
    footerAddress,
    footerEmail,
    footerNumber,
    facebook,
    youtube,
    linkedin,
  });
  res.status(200).json({ footer, message: "Footer Created Successful" });
});

/**
 * @Desc Delete Footer
 * @Method Delete
 * @Access Private
 */
export const deleteFooter = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // Delete Photo from DB
  let deletePhoto = await Footer.findByIdAndDelete(id);

  res.status(200).json({ deletePhoto, message: "Footer Deleted Successful" });
});

/**
 * @Desc Update Footer
 * @Method Delete
 * @Access Private
 */
export const updateFooter = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    footerNumber,
    footerEmail,
    footerAddress,
    facebook,
    youtube,
    linkedin,
  } = req.body;

  // Update Footer Status
  const footerUpdate = await Footer.findById(id);

  // Footer Email
  let footermail = footerUpdate.footerEmail;
  if (footerEmail) {
    footermail = footerEmail;
  }

  // Footer Number
  let footerNum = footerUpdate.footerNumber;
  if (footerNumber) {
    footerNum = footerNumber;
  }

  // Footer Address
  let footerLocation = footerUpdate.footerAddress;
  if (footerAddress) {
    footerLocation = footerAddress;
  }

  // Footer Fb
  let footerFb = footerUpdate.facebook;
  if (facebook) {
    footerFb = facebook;
  }

  // Footer Yt
  let footerYt = footerUpdate.youtube;
  if (youtube) {
    footerYt = youtube;
  }

  // Footer Linkedin
  let footerIn = footerUpdate.linkedin;
  if (linkedin) {
    footerIn = linkedin;
  }

  footerUpdate.facebook = footerFb;
  footerUpdate.youtube = footerYt;
  footerUpdate.linkedin = footerIn;
  footerUpdate.footerAddress = footerLocation;
  footerUpdate.footerEmail = footermail;
  footerUpdate.footerNumber = footerNum;
  footerUpdate.save();

  res
    .status(200)
    .json({ footer: footerUpdate, message: "Footer Updated Successful" });
});

/**
 * @Desc Update Footer Status
 * @Method Delete
 * @Access Private
 */
export const updateFooterStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update Footer Status
  const statusFooter = await Footer.findByIdAndUpdate(
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
    .json({ status: statusFooter, message: "Status Updated Successful" });
});
