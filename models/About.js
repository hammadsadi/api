import mongoose from "mongoose";

// Create banner Schema
const aboutSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      default: null,
      trim: true,
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

export default mongoose.model("About", aboutSchema);
