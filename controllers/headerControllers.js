import Header from "../models/Header.js";
import expressAsyncHandler from "express-async-handler";
import { cloudPhotoDelete, photoUploadToCloud } from "../util/cloudUpload.js";
import { createSlug, getPublicId } from "../helper/helper.js";

/**
 * @Desc Get Header
 * @Method Get
 * @Access Private
 */
export const getAllHeader = expressAsyncHandler(async (req, res) => {
  let headers = await Header.find();
  // Validation
  if (!headers.length > 0) {
    return res.status(404).json({ message: "Header Not Found" });
  }

  res.status(200).json({ headers, message: "Header Get Successful" });
});

/**
 * @Desc Create Header
 * @Method POST
 * @Access Private
 */
export const createHeader = expressAsyncHandler(async (req, res) => {
  const { callInfo, openInfo } = req.body;

  // Validation
  if (!callInfo || !openInfo) {
    return res.status(400).json({ message: "All Filed is Required" });
  }

  const checkHeader = await Header.findOne({ callInfo });
  if (checkHeader) {
    return res.status(400).json({ message: "Header Already Exist" });
  }

  let header = await Header.create({
    callInfo,
    openInfo,
  });
  res.status(200).json({ header, message: "Header Created Successful" });
});

/**
 * @Desc Delete Header
 * @Method Delete
 * @Access Private
 */
export const deleteHeader = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // Delete Photo from DB
  let deleteAppointmentInfo = await Header.findByIdAndDelete(id);

  res.status(200).json({
    appointment: deleteAppointmentInfo,
    message: "Appointment Info Deleted Successful",
  });
});

/**
 * @Desc Update Header
 * @Method PUT / PATCH
 * @Access Private
 */
export const updateHeader = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { callInfo, openInfo } = req.body;

  // Update Header Status
  let headerUpdate = await Header.findById(id);

  // Header callInfo
  let headerCallInfo = headerUpdate.callInfo;
  if (callInfo) {
    headerCallInfo = callInfo;
  }

  // Header Desc
  let headerOpenInfo = headerUpdate.openInfo;
  if (openInfo) {
    headerOpenInfo = openInfo;
  }

  headerUpdate.callInfo = headerCallInfo;
  headerUpdate.openInfo = headerOpenInfo;
  headerUpdate.save();

  res.status(200).json({
    header: headerUpdate,
    message: "Header Updated Successful",
  });
});

/**
 * @Desc Update Header Status
 * @Method Delete
 * @Access Private
 */
export const updateHeaderStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update Header Status
  const statusHeader = await Header.findByIdAndUpdate(
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
    .json({ status: statusHeader, message: "Status Updated Successful" });
});
