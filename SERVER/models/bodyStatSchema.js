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
    },
  },
  { timestamps: true }
);

export const BodyStat = mongoose.model("BodyStat", bodyStatSchema);
