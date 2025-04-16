import Project from "../models/project.model.js";

export const createProjectService = async (projectData) => {
  return await Project.create(projectData);
};

export const getProjectByCreatorService = async (userId) => {
  return await Project.find({ createdBy: userId })
    .populate("members")
    .populate("createdBy");
};
