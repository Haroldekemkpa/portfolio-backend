import express from "express";
import {
  loginAdminController,
  deleteAdminController,
  getAllAdminController,
  createAdminController,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdminController);
adminRouter.delete("/:id", deleteAdminController);
adminRouter.get("/", getAllAdminController);
adminRouter.post("/signup", createAdminController);

export default adminRouter;
