const workoutSchema = new mongoose.Schema(
  {
    user: {
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
          type: Number, // exercise id
          required: true,
        },
        sets: {
          type: Number,
          required: true,
        },
        reps: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Workout = mongoose.model("Workout", workoutSchema);
