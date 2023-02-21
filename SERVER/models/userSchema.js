import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    dob: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],

    defaultWorkout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
    },
  },

  { timestamps: true }
);

export const user = mongoose.model("user", userSchema);
