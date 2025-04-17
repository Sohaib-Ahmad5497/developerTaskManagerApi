import {
  createTaskService,
  deleteTaskByIdService,
  getAllTasksService,
  getTaskByFilterService,
  getTaskByIdService,
  updateTaskByIdService,
} from "../services/task.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createTask = async (req, res) => {
  try {
    const task = await createTaskService(req.body);
    return successResponse({
      res,
      data: task,
      message: "Task is created successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error in creating Task", error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );

      return errorResponse({
        res,
        message: "Validation failed",
        statusCode: 400,
        error: validationErrors,
      });
    }

    const status = error.code === 11000 ? 400 : 500;
    const message =
      error.code === 11000
        ? "Task with the same title already exists"
        : "Failed to create task";

    return errorResponse({
      res,
      message,
      statusCode: status,
      error,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTask = await getAllTasksService(req.body);
    return successResponse({
      res,
      data: allTask,
      message: "All task fetched successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error in fetching tasks", error);
    return errorResponse({
      res,
      message: "Failed to fetched all tasks",
      statusCode: 500,
      error,
    });
  }
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const taskById = await getTaskByIdService(taskId);
    return successResponse({
      res,
      data: taskById,
      message: "Task fetched successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error in fetching task", error);
    const status = error.statusCode === 404 ? 404 : 500;
    const message =
      error.statusCode === 404 ? "Task not found" : "Failed to fetch task";

    return errorResponse({
      res,
      message,
      statusCode: status,
      error,
    });
  }
};

export const deleteTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const taskById = await deleteTaskByIdService(taskId);
    return successResponse({
      res,
      data: taskById,
      message: "Task deleted successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error in deleting task", error);

    const status = error.statusCode === 404 ? 404 : 500;
    const message =
      error.statusCode === 404 ? "Task not found" : "Failed to delete task";

    return errorResponse({
      res,
      message,
      statusCode: status,
      error,
    });
  }
};

export const updateTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const updatedTaskById = await updateTaskByIdService(taskId, req.body);
    return successResponse({
      res,
      data: updatedTaskById,
      message: "Task updated successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error in updating task", error);
    const status = error.code === 404 ? 404 : 500;
    const message =
      error.code === 404 ? "Task not found" : "Failed to update the task";

    return errorResponse({
      res,
      message,
      statusCode: status,
      error,
    });
  }
};

export const getTaskByFilter = async (req, res) => {
  try {
    const filteredTasks = await getTaskByFilterService(req.query);

    if (filteredTasks.length === 0) {
      return successResponse({
        res,
        data: filteredTasks,
        message: "There is no tasks against this filter",
        statusCode: 200,
      });
    }
    return successResponse({
      res,
      data: filteredTasks,
      message: "Filtered tasks fetched successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error in tasks filtration", error);
    const status = error.code === 404 ? 404 : 500;
    const message =
      error.code === 404
        ? "Filtered tasks not found"
        : "Failed to fetch the filtered tasks";

    return errorResponse({
      res,
      message,
      statusCode: status,
      error,
    });
  }
};
