import { user } from "../models/userSchema.js";
import {BodyStat} from "../models/bodyStatSchema.js"


export const getBodyWeight  = async (req, res) => {

    const userID = req.query.userID;

    try {
        const bodyStats = await BodyStat.find({ userID: userID });

        res.status(200).json(bodyStats.Weight);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}