import { user } from "../models/userSchema.js";
import { BodyStat } from "../models/bodyStatSchema.js";

export const getBodyWeight = async (req, res) => {
  const userID = req.query.userID;
  try {
    const bodyStats = await BodyStat.find({ userID: userID });
    console.log("BODYUSER", bodyStats);
    res.status(200).json(bodyStats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const addBodyWeight = async (req, res) => {
  const { userID, weight } = req.body;

  try {

 // Check if a record already exists for the current day
 const existingEntry = await BodyStat.findOne({
    userID,
    createdAt: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)), // beginning of today
      $lte: new Date(new Date().setHours(23, 59, 59, 999)) // end of today
    }
  });

  if (existingEntry) {
    return res.status(400).json({ error: "You have already submitted your weight for today" });
  }


    const createBodyWeightStat = await BodyStat.create({
      userID,
      weight,
    });

    res.status(201).json({
      userID: createBodyWeightStat.userID,
      weight: createBodyWeightStat.weight,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
