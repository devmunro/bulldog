import mongoose from "mongoose";

const workoutStatsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId, // link to user
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true, // extra option to display better in database
    },
    exercises: [
      {
        exercise: {
          type: mongoose.Schema.Types.ObjectId, // exercise id
          required: true,
        },
        name: {
          type: String,
          required: true,
        },

        sets: [
          {
            reps: {
              type: Number,
            },
            weight: {
              type: Number,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const WorkoutStats = mongoose.model("WorkoutStats", workoutStatsSchema);
