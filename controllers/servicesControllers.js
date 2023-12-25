import Service from "../models/Service.js";
import expressAsyncHandler from "express-async-handler";
import { cloudPhotoDelete, photoUploadToCloud } from "../util/cloudUpload.js";
import { createSlug, getPublicId } from "../helper/helper.js";

/**
 * @Desc Get Service
 * @Method Get
 * @Access Private
 */
export const getAllService = expressAsyncHandler(async (req, res) => {
  let services = await Service.find();
  // Validation
  if (!services.length > 0) {
    return res.status(404).json({ message: "Service Not Found" });
  }

  res.status(200).json({ services, message: "Service Get Successful" });
});

/**
 * @Desc Create Service
 * @Method POST
 * @Access Private
 */
export const createService = expressAsyncHandler(async (req, res) => {
  const { title, subTitle, desc } = req.body;

  // Validation
  if (!title || !subTitle || !desc) {
    return res.status(400).json({ message: "All Filed is Required" });
  }

  const checkService = await Service.findOne({ title });
  if (checkService) {
    return res.status(400).json({ message: "Service Already Exist" });
  }

  // Photo Manage
  let servicImage = null;
  if (req.file) {
    //   Upload Photo to Cloud
    let photoUp = await photoUploadToCloud(req.file.path);
    servicImage = photoUp.secure_url;
  }

  let service = await Service.create({
    title,
    slug: createSlug(title),
    subTitle,
    desc,
    photo: servicImage,
  });
  res.status(200).json({ service, message: "Service Created Successful" });
});

/**
 * @Desc Delete Service
 * @Method Delete
 * @Access Private
 */
export const deleteService = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // Delete Photo from DB
  let deletePhoto = await Service.findByIdAndDelete(id);
  //   Delete Photo from Cloud
  if (deletePhoto.photo) {
    await cloudPhotoDelete(getPublicId(deletePhoto.photo));
  }
  res.status(200).json({ deletePhoto, message: "Service Deleted Successful" });
});

/**
 * @Desc Update Service
 * @Method Delete
 * @Access Private
 */
export const updateService = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, subTitle, desc } = req.body;

  // Update Service Status
  const serviceUpdate = await Service.findById(id);

  // Service Photo
  let servicePhto = serviceUpdate.photo;
  if (req.file) {
    let photoUpLink = await photoUploadToCloud(req.file.path);
    servicePhto = photoUpLink.secure_url;
    //   Delete Photo from Cloud
    await cloudPhotoDelete(getPublicId(serviceUpdate.photo));
  }

  // Service Title
  let serviceTitle = serviceUpdate.title;
  if (title) {
    serviceTitle = title;
  }

  // Service Subtitle
  let serviceSubTitle = serviceUpdate.subTitle;
  if (subTitle) {
    serviceSubTitle = subTitle;
  }

  // Service Desc
  let serviceDesc = serviceUpdate.desc;
  if (desc) {
    serviceDesc = desc;
  }

  serviceUpdate.title = serviceTitle;
  serviceUpdate.slug = createSlug(serviceTitle);
  serviceUpdate.subTitle = serviceSubTitle;
  serviceUpdate.desc = serviceDesc;
  serviceUpdate.photo = servicePhto;
  serviceUpdate.save();

  res
    .status(200)
    .json({ service: serviceUpdate, message: "Service Updated Successful" });
});

/**
 * @Desc Update Service Status
 * @Method Delete
 * @Access Private
 */
export const updateServiceStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update Service Status
  const statusService = await Service.findByIdAndUpdate(
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
    .json({ status: statusService, message: "Status Updated Successful" });
});
