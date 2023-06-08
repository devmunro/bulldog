import express from "express";
import { getBodyWeight } from "../controllers/bodyStatController.js";

export const bodyStatRoutes = () => {
  const bodyStatRoute = express();

  bodyStatRoute.get("/", getBodyWeight);

  return bodyStatRoute;
};
