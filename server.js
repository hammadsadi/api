import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectWithMongoDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import technologyRoutes from "./routes/technologyRoutes.js";
import headerRoutes from "./routes/headerRoutes.js";
import logoRoutes from "./routes/logoRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";

// Init Express
const app = express();

// Init Environment Variable
dotenv.config();
const PORT = process.env.PORT || 9000;

// Init Public Folder
app.use(express.static("public"));

// Init Cors
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://surgicare.info",
      "https://rest-api-nzth.onrender.com",
      "https://my-app-peach-eight.vercel.app",
    ],
    credentials: true,
    // methods: "GET, POST, PUT, PATCH, DELETE",
    // optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());

// Manage Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routing
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/about", aboutRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/technology", technologyRoutes);
app.use("/api/v1/header", headerRoutes);
app.use("/api/v1/logo", logoRoutes);
app.use("/api/v1/footer", footerRoutes);

// Handle Error
app.use(errorHandler);

// Kisten Server
app.listen(PORT, () => {
  console.log(`Server is Running On port ${PORT}`.bgGreen.black);
  connectWithMongoDB();
});
