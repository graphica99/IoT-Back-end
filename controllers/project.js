const Project = require("../model/Project");

exports.addProject = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { name } = req.body;

    let proj = await Project.findOne({ name });
    if (proj) {
      res.status(400).json({
        msg: " Please you cannot name two project with the same name",
      });
    }
    let project = new Project({
      name,
      user_id,
    });
    const saveProject = await project.save();
    res.json({ msg: "project saved successfully" });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.editProject = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { name } = req.body;
    let projectId = req.params.id;
    let proj = await Project.findOne({ name });
    if (proj) {
      res.status(400).json({
        msg: " Please you cannot name two project with the same name",
      });
    } else {
      res.json({ msg: "project updated successfully" });
    }
    let project = await Project.findByIdAndUpdate(projectId, {
      name: name,
      user_id: user_id,
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.getProjectTitle = async (req, res) => {
  try {
    const userId = req.user.id;
    let projectTitle = await Project.findOne({ user_id: userId });
    res.json(projectTitle);
  } catch (error) {
    console.log(error);
  }
};

//!! A delete project and must delete all devices related to that project
