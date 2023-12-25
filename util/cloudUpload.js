import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "ddebtxhom",
  api_key: "941479952343472",
  api_secret: "mDDW9VzU5mSTpb4yonokKzARshs",
});

// Upload Photo
export const photoUploadToCloud = async (filePath) => {
  let dataLink = await cloudinary.v2.uploader.upload(filePath);
  return dataLink;
};

// Upload File Delete
export const cloudPhotoDelete = async (fileUrl) => {
  await cloudinary.v2.uploader.destroy(fileUrl);
};
