import multer from "multer";

// Create Storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      "surgicare-photo" +
        "-" +
        Math.round(Math.random() + 1000) +
        file.originalname
    );
  },
});

// Photo Upload Middleware
export const bannerPhoto = multer({ storage }).single("bannerPhoto");
export const aboutPhoto = multer({ storage }).single("aboutPhoto");
export const service_Photo = multer({ storage }).single("servicePhoto");
export const footer_Photo = multer({ storage }).single("footerLogo");
export const doctor_Photo = multer({ storage }).single("doctorPhoto");
export const blog_Photo = multer({ storage }).single("blogPhoto");
export const technology_Photo = multer({ storage }).single("technologyPhoto");
export const logo_Photo = multer({ storage }).single("logoPhoto");
