import express from "express"
import {createWorkout, findworkouts, addExercise} from  "../controllers/workoutController.js"


 export const WorkoutRouter =() => {

    const workoutRouter = express();
// full route example /api/workout/createworkout
    workoutRouter.post("/createworkout", createWorkout) //
    workoutRouter.get("/findworkouts", findworkouts) //
    workoutRouter.put("/addexercise", addExercise) //

    return workoutRouter
}

