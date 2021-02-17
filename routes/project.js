const express = require("express");
const route = express.Router();
const {
  addProject,
  editProject,
  getProjectTitle,
} = require("../controllers/project");
const { authenticated } = require("../middlewares/auth");
route.get("/get-project-title", authenticated, getProjectTitle);
route.post("/add-project", authenticated, addProject);
route.post("/edit-project/:id", authenticated, editProject);

module.exports = route;
