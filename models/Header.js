import mongoose from "mongoose";

// Create banner Schema
const headerSchema = mongoose.Schema(
  {
    callInfo: {
      type: String,
      required: true,
      trim: true,
    },
    openInfo: {
      type: String,
      required: true,
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

export default mongoose.model("Header", headerSchema);
