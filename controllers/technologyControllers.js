import Technology from "../models/Technology.js";
import expressAsyncHandler from "express-async-handler";
import { cloudPhotoDelete, photoUploadToCloud } from "../util/cloudUpload.js";
import { createSlug, getPublicId } from "../helper/helper.js";

/**
 * @Desc Get Technology
 * @Method Get
 * @Access Private
 */
export const getAllTechnology = expressAsyncHandler(async (req, res) => {
  let technologys = await Technology.find();
  // Validation
  if (!technologys.length > 0) {
    return res.status(404).json({ message: "Technology Not Found" });
  }

  res
    .status(200)
    .json({ technologies: technologys, message: "Technology Get Successful" });
});

/**
 * @Desc Create Technology
 * @Method POST
 * @Access Private
 */
export const createTechnology = expressAsyncHandler(async (req, res) => {
  const { title, shortDesc, longDesc } = req.body;

  // Validation
  if (!title || !shortDesc || !longDesc) {
    return res.status(400).json({ message: "All Filed is Required" });
  }

  const checkTechnology = await Technology.findOne({ title });
  if (checkTechnology) {
    return res.status(400).json({ message: "Technology Already Exist" });
  }

  // Photo Manage
  let technologyImage = null;
  if (req.file) {
    //   Upload Photo to Cloud
    let photoUp = await photoUploadToCloud(req.file.path);
    technologyImage = photoUp.secure_url;
  }

  let technology = await Technology.create({
    title,
    shortDesc,
    longDesc,
    slug: createSlug(title),
    photo: technologyImage,
  });
  res
    .status(200)
    .json({ technology, message: "Technology Created Successful" });
});

/**
 * @Desc Delete Technology
 * @Method Delete
 * @Access Private
 */
export const deleteTechnology = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // Delete Photo from DB
  let deletePhoto = await Technology.findByIdAndDelete(id);
  //   Delete Photo from Cloud
  if (deletePhoto.photo) {
    await cloudPhotoDelete(getPublicId(deletePhoto.photo));
  }
  res
    .status(200)
    .json({ deletePhoto, message: "Technology Deleted Successful" });
});

/**
 * @Desc Update Technology
 * @Method Delete
 * @Access Private
 */
export const updateTechnology = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, shortDesc, longDesc } = req.body;

  // Update Technology Status
  let technologyUpdate = await Technology.findById(id);

  // Technology Photo
  let technologyPhto = technologyUpdate.photo;
  if (req.file) {
    let photoUpLink = await photoUploadToCloud(req.file.path);
    technologyPhto = photoUpLink.secure_url;
    //   Delete Photo from Cloud
    await cloudPhotoDelete(getPublicId(technologyUpdate.photo));
  }

  // Technology Name
  let technologyTitle = technologyUpdate.title;
  if (title) {
    technologyTitle = title;
  }

  // Technology Desc
  let technologyShortDesc = technologyUpdate.shortDesc;
  if (shortDesc) {
    technologyShortDesc = shortDesc;
  }

  // Technology long Desc
  let technologyLongDesc = technologyUpdate.longDesc;
  if (longDesc) {
    technologyLongDesc = longDesc;
  }

  technologyUpdate.title = technologyTitle;
  technologyUpdate.shortDesc = technologyShortDesc;
  technologyUpdate.longDesc = technologyLongDesc;
  technologyUpdate.slug = createSlug(technologyTitle);
  technologyUpdate.photo = technologyPhto;
  technologyUpdate.save();

  res.status(200).json({
    technology: technologyUpdate,
    message: "Technology Updated Successful",
  });
});

/**
 * @Desc Update Technology Status
 * @Method Delete
 * @Access Private
 */
export const updateTechnologyStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update Technology Status
  const statusTechnology = await Technology.findByIdAndUpdate(
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
    .json({ status: statusTechnology, message: "Status Updated Successful" });
});
