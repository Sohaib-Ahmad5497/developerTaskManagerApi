import Task from "../models/task.model.js";

export const createTaskService = async (taskData) => {
  const isAlreadyExist = await Task.findOne({ title: taskData.title });

  if (isAlreadyExist) {
    const error = new Error("Task already exists");
    error.code = 11000;
    throw error;
  }

  return await Task.create(taskData);
};

export const getAllTasksService = async () => {
  return await Task.find().populate("assignedTo").populate("project");
};

export const getTaskByIdService = async (id) => {
  const task = await Task.findById(id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return await Task.findById(id).populate("assignedTo").populate("project");
};

export const deleteTaskByIdService = async (id) => {
  const task = await Task.findById(id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return await Task.findByIdAndDelete(id);
};

export const updateTaskByIdService = async (id, updateData) => {
  const task = await Task.findById(id);

  if (!task) {
    const error = new Error("Task not found");
    error.code = 404;
    throw error;
  }

  return Task.findByIdAndUpdate(id, updateData, { new: true })
    .populate("assignedTo")
    .populate("project");
};

export const getTaskByFilterService = async (filters) => {
  
  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.assignedTo) {
    query.assignedTo = filters.assignedTo;
  }

  if (filters.project) {
    query.project = filters.project;
  }

  if (filters.startDate || filters.endDate) {
    query.createdAt = {};
    if (filters.startDate) {
      query.createdAt.$gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      query.createdAt.$lte = new Date(filters.endDate);
    }
  }  

  return await Task.find(query).populate("assignedTo").populate("project");
};
