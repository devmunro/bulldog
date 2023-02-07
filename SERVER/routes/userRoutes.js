import express from "express"
import {getUserWorkouts, registerUser} from "../controllers/userController.js"
import { loginUser } from "../controllers/userController.js";

 export const UserRouter =() => {

    const userRouter = express();

    userRouter.post("/signup", registerUser)
    userRouter.post("/login", loginUser);
    userRouter.get("/getUserWorkouts", getUserWorkouts);

    return userRouter
}

