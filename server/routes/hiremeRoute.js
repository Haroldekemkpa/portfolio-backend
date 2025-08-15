import express from "express";
import {
  createHireController,
  getAllHireController,
} from "../controllers/hiremeController.js";

const hireRouter = express.Router();

// hireRouter.get("/", getAllHireRequest);

hireRouter.post("/create", createHireController);
hireRouter.get("/", getAllHireController);

export default hireRouter;
