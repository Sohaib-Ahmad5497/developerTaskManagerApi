import { createTaskService } from "../services/task.service.js";
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
    if (error.code === 11000 && error.keyPattern?.name) {
      return errorResponse({
        res,
        message: "Task already exists",
        statusCode: 400,
        error,
      });
    }
    return errorResponse({
      res,
      message: "Failed to create Task",
      statusCode: 500,
      error,
    });
  }
};
