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

    gender: {
      type: String,
    },

    height: [
      {
        value: Number, // Height value in user's preferred unit (cm or inches)
        date: Date, // Timestamp of when the height value was recorded
      },
    ],
    weight: [
      {
        value: Number, // Weight value in user's preferred unit (kg or lbs)
        date: Date, // Timestamp of when the weight value was recorded
      },
    ],
    fitnessGoal: {
      // Weight loss, muscle gain, endurance, flexibility, etc.
      type: String,
    },

    equipmentAccess: {
      type: String,
    },

    location: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],

    defaultWorkout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
    },

    workoutStats: [
      { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutStats" },
    ],
  },

  { timestamps: true }
);

export const user = mongoose.model("user", userSchema);
