import "dotenv/config";

import { Exercise } from "../models/exerciseSchema.js";

export const getExercisesByType = async (req, res) => {
  const type = req.query.type;
    console.log(type)
  try {
    const exercises = await Exercise.find({ body_type: type });
    
    console.log(exercises)
    res.status(200).json(exercises);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
