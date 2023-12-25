import mongoose from "mongoose";

// Create banner Schema
const bannerSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Banner", bannerSchema);
