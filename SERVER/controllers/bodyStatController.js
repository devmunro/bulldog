import { user } from "../models/userSchema.js";
import {BodyStat} from "../models/bodyStatSchema.js"


export const getBodyWeight  = async (req, res) => {
   
    const userID = req.query.userID;
    console.log("BODYUSER", userID)

    try {
        const bodyStats = await BodyStat.find({ userID: userID });
        console.log("BODYUSER", bodyStats)
        res.status(200).json(bodyStats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}