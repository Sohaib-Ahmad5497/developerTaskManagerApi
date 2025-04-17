import { Router } from "express";
import { createTask, deleteTaskById, getAllTasks, getTaskByFilter, getTaskById, updateTaskById } from "../controllers/task.controller.js";

const router = Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get('/filter' , getTaskByFilter)
router.get("/:taskId", getTaskById);
router.delete("/:taskId", deleteTaskById);
router.put('/:taskId' , updateTaskById)

export default router;
