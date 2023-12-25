import Doctor from "../models/Doctor.js";
import expressAsyncHandler from "express-async-handler";
import { cloudPhotoDelete, photoUploadToCloud } from "../util/cloudUpload.js";
import { getPublicId } from "../helper/helper.js";

/**
 * @Desc Get Doctor
 * @Method Get
 * @Access Private
 */
export const getAllDoctor = expressAsyncHandler(async (req, res) => {
  let doctors = await Doctor.find();
  // Validation
  if (!doctors.length > 0) {
    return res.status(404).json({ message: "Doctor Not Found" });
  }

  res.status(200).json({ doctors, message: "Doctor Get Successful" });
});

/**
 * @Desc Create Doctor
 * @Method POST
 * @Access Private
 */
export const createDoctor = expressAsyncHandler(async (req, res) => {
  const { name, desc } = req.body;

  // Validation
  if (!name || !desc) {
    return res.status(400).json({ message: "All Filed is Required" });
  }

  const checkDoctor = await Doctor.findOne({ name });
  if (checkDoctor) {
    return res.status(400).json({ message: "Doctor Already Exist" });
  }

  // Photo Manage
  let doctorImage = null;
  if (req.file) {
    //   Upload Photo to Cloud
    let photoUp = await photoUploadToCloud(req.file.path);
    doctorImage = photoUp.secure_url;
  }

  let doctor = await Doctor.create({
    name,
    desc,
    photo: doctorImage,
  });
  res.status(200).json({ doctor, message: "Doctor Created Successful" });
});

/**
 * @Desc Delete Doctor
 * @Method Delete
 * @Access Private
 */
export const deleteDoctor = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // Delete Photo from DB
  let deletePhoto = await Doctor.findByIdAndDelete(id);
  //   Delete Photo from Cloud
  if (deletePhoto.photo) {
    await cloudPhotoDelete(getPublicId(deletePhoto.photo));
  }
  res.status(200).json({ deletePhoto, message: "Doctor Deleted Successful" });
});

/**
 * @Desc Update Doctor
 * @Method Delete
 * @Access Private
 */
export const updateDoctor = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, desc } = req.body;

  // Update Doctor Status
  let doctorUpdate = await Doctor.findById(id);

  // Doctor Photo
  let doctorPhto = doctorUpdate.photo;
  if (req.file) {
    let photoUpLink = await photoUploadToCloud(req.file.path);
    doctorPhto = photoUpLink.secure_url;
    //   Delete Photo from Cloud
    await cloudPhotoDelete(getPublicId(doctorUpdate.photo));
  }

  // Doctor Name
  let doctorName = doctorUpdate.name;
  if (name) {
    doctorName = name;
  }

  // Doctor Desc
  let doctorDesc = doctorUpdate.desc;
  if (desc) {
    doctorDesc = desc;
  }

  doctorUpdate.name = doctorName;
  doctorUpdate.desc = doctorDesc;
  doctorUpdate.photo = doctorPhto;
  doctorUpdate.save();

  res
    .status(200)
    .json({ doctor: doctorUpdate, message: "Doctor Updated Successful" });
});

/**
 * @Desc Update Doctor Status
 * @Method Delete
 * @Access Private
 */
export const updateDoctorStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update Doctor Status
  const statusDoctor = await Doctor.findByIdAndUpdate(
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
    .json({ status: statusDoctor, message: "Status Updated Successful" });
});
