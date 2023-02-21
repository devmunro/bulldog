import "dotenv/config";

import { Exercise } from "../models/exerciseSchema.js";

export const getExercisesByType = async (req, res) => {
  const type = req.query.type;

  try {
    const exercises = await Exercise.find({ body_type: type });

    res.status(200).json(exercises);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
