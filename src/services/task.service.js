import Task from "../models/task.model.js";

export const createTaskService = async (taskData) => {
  return (await (await Task.create(taskData)).populate("assignedTo")).populate(
    "project"
  );
};
