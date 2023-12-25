import bcrypt from "bcrypt";
//  Make Hash Password
export const makeHashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

// Get Public Id For Cloudinary
export const getPublicId = (fileUrl) => {
  return fileUrl.split("/")[fileUrl.split("/").length - 1].split(".")[0];
};

// Create Slug

export const createSlug = (title) => {
  // Convert to lowercase and replace spaces with hyphens
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  // Remove special characters except hyphens
  const cleanSlug = slug.replace(/[^a-z0-9-]/g, "");

  // Remove consecutive hyphens
  const finalSlug = cleanSlug.replace(/-+/g, "-");

  return finalSlug;
};
