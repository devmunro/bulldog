import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
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

    goal: {
      type: String,
      required: true,
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
        img: {
          type: String,
        },

        sets: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        weight: {
          type: Number,
        },

        body_type: {
          type: [String],
          required: true,
        },
        equipment: {
          type: [String],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Workout = mongoose.model("Workout", workoutSchema);
