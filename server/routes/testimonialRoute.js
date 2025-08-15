import express from "express";
import {
  getAllTestimonialController,
  deleteTestimonialController,
  createTestimonialController,
} from "../controllers/testimonialController.js";
import { uploadFile } from "../middleware/multerMiddleWare.js";

const testimonialRouter = express.Router();

testimonialRouter.get("/", getAllTestimonialController);
testimonialRouter.delete("/delete/:id", deleteTestimonialController);
testimonialRouter.post("/create", uploadFile, createTestimonialController);

export default testimonialRouter;
