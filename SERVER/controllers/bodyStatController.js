import { user } from "../models/userSchema.js";
import { BodyStat } from "../models/bodyStatSchema.js";

export const getBodyWeight = async (req, res) => {
  const userID = req.query.userID;
  console.log("BODYUSER", userID);

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
  console.log("BODYUSER", userID);

  try {
    const createBodyWeightStat = await BodyStat.create({
      userID,
      weight,
      date: createBodyWeightStat.createdAt,
    });

    res.status(201).json({
      userID: createBodyWeightStat.userID,
      weight: createBodyWeightStat.weight,
      date: createBodyWeightStat.createdAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
