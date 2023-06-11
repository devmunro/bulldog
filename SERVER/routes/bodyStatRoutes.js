import express from "express";
import { addBodyWeight, getBodyWeight } from "../controllers/bodyStatController.js";

export const bodyStatRoutes = () => {
  const bodyStatRoute = express();

  bodyStatRoute.get("/", getBodyWeight);
  bodyStatRoute.post("/addbodyweight", addBodyWeight);

  return bodyStatRoute;
};
