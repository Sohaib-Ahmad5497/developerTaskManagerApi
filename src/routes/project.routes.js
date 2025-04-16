import { Router } from "express";
import {
  createProject,
  getProjectByCreator,
} from "../controllers/project.controller.js";

const router = Router();

router.post("/", createProject);
router.get("/created-by/:userId", getProjectByCreator);

export default router;
