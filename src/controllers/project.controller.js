import {
  createProjectService,
  getProjectByCreatorService,
} from "../services/project.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
export const createProject = async (req, res) => {
  try {
    const project = await createProjectService(req.body);
    return successResponse({
      res,
      data: project,
      message: "Project is created successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error in creating project", error);
    if (error.code === 11000 && error.keyPattern?.name) {
      return errorResponse({
        res,
        message: "Project already exists",
        statusCode: 400,
        error,
      });
    }
    return errorResponse({
      res,
      message: "Failed to create project",
      statusCode: 500,
      error,
    });
  }
};

export const getProjectByCreator = async (req, res) => {
  const { userId } = req.params;
  try {
    const project = await getProjectByCreatorService(userId);

    if (project.length === 0) {
      return successResponse({
        res,
        data: project,
        message: "There is no Project against this creator",
        statusCode: 201,
      });
    }

    return successResponse({
      res,
      data: project,
      message: "Project is fetched successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error in fetching the project by creator", error);
    return errorResponse({
      res,
      message: "Error in fetching the project by creator",
      statusCode: 500,
      error,
    });
  }
};
