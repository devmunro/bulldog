import mongoose from "mongoose";

const workoutStatsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId, // link to user
      ref: "User",
      required: true,
    },

    workoutID: {
      type: mongoose.Schema.Types.ObjectId, // link to workout being performed
      ref: "Workout",
      required: true,
    },
    workoutName: {
      type: String,
      required: true,
      trim: true, // extra option to display better in database
    },
    exercises: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId, // exercise id
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        body_type: [String],
        equipment: [String],
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
