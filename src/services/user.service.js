import User from "../models/user.model.js";

export const createUserService = async (userData) => {
  return await User.create(userData);
};

export const getAllUserService = async () => {
  return await User.find();
};
