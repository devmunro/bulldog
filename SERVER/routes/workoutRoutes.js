import express from "express"


 export const WorkoutRouter =() => {

    const workoutRouter = express();

    workoutRouter.post("/createworkout", createWorkout)
   
    return workoutRouter
}

