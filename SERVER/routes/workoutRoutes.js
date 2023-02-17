import express from "express"
import {createWorkout, findworkouts} from  "../controllers/workoutController.js"


 export const WorkoutRouter =() => {

    const workoutRouter = express();
// full route example /api/workout/createworkout
    workoutRouter.post("/createworkout", createWorkout) //
    workoutRouter.get("/findworkouts", findworkouts) //

    return workoutRouter
}

