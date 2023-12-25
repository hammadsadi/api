import mongoose from "mongoose";

// Create banner Schema
const footerSchema = mongoose.Schema(
  {
    footerNumber: {
      type: String,
      required: true,
      trim: true,
    },
    footerEmail: {
      type: String,
      required: true,
      trim: true,
    },
    footerAddress: {
      type: String,
      required: true,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
      default: null,
    },
    linkedin: {
      type: String,
      trim: true,
      default: null,
    },
    youtube: {
      type: String,
      trim: true,
      default: null,
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

export default mongoose.model("Footer", footerSchema);
