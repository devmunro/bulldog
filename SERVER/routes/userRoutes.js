import express from "express"
import {registerUser} from "../controllers/userController.js"


 export const UserRouter =() => {

    const userRouter = express();

    userRouter.post("/signup", registerUser)

    return userRouter
}

