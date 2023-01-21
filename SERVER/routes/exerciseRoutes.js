import express from "express"
import { getAllExercises } from "../controllers/exerciseController.js"


export const exerciseRoutes = () => {

   const  exerciseRoute= express()

   exerciseRoute.get("/", getAllExercises)


   return exerciseRoute

}