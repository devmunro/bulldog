import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    body_type: {
      type: [String],
      required: true,
    },
    equipment: {
      type: [String],
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Exercise = mongoose.model("Exercise", exerciseSchema);
