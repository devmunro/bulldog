import mongoose from "mongoose";

const bodyStatSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId, // link to user
      ref: "User",
      required: true,
    },

    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Exercise = mongoose.model("BodyStat", bodyStatSchema);
