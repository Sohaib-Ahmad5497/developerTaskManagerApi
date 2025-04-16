import {
  createUserService,
  getAllUserService,
} from "../services/user.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    return successResponse({
      res,
      data: user,
      message: "User is created successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error in creating user", error);
    // Check for duplicate email error
    if (error.code === 11000 && error.keyPattern?.email) {
      return errorResponse({
        res,
        message: "Email already exists",
        statusCode: 400,
        error,
      });
    }
    return errorResponse({
      res,
      message: "Failed to create user",
      statusCode: 500,
      error,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await getAllUserService();
    return successResponse({
      res,
      data: allUsers,
      message: "Successfully fetch all users",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error in fetching users", error);
    return errorResponse({
      res,
      message: "Failed to fetch all users",
      statusCode: 500,
      error,
    });
  }
};
