const Device = require("../model/Device");
const randId = require("random-id");
const mongoose = require("mongoose");
const Project = require("../model/Project");
//ADD DEVICE
exports.addDevice = async (req, res) => {
  try {
    const { name, purpose, mqttId, mqttPassword } = req.body;
    const dev_id = randId(30, "aA0");
    // console.log(req.body);
    // console.log(dev_id);

    //add to db
    //name,dev_id,project_id,purpose,mqttId,mqttPassword,data(array)
    const userId = req.user.id;
    const findProjectId = await Project.findOne({ user_id: userId });
    const project_id = findProjectId._id;
    // console.log(project_id);
    // const data = [];
    // res.json(projectID);
    const device = new Device({
      name: name,
      dev_id: dev_id,
      project_id: project_id,
      purpose: purpose,
      mqttId: mqttId,
      mqttPassword: mqttPassword,
      data: [],
    });

    await device.save((err, device) => {
      if (err) {
        // console.log(err);
        res.json({ error: err });
      } else {
        // console.log(device);
        res.status("200").json({ device });
      }
    });
  } catch (error) {
    res.json({ msg: error });
  }
};

//GET ALL DEVICES
exports.getDevices = async (req, res) => {
  try {
    var user_id = req.user.id;
    var project = await Project.findOne({ user_id: user_id });
    var project_id = project._id;
    // console.log("project id ===========" + project_id);
    var devices = await Device.find({ project_id: project_id });

    if (devices) {
      res.json(devices);
    } else {
      res.json(`Couldn't fetch all devices`);
    }
    // Device.find({}).exec((err, devices) => {
    //   if (err) {
    //     res.json("couldn't fetch all devices");
    //   } else {
    //     res.json(devices);
    //   }
    // });
  } catch (error) {
    console.log(error);
  }
};

//GET SINGLE DEVICE
exports.getSingleDevice = (req, res) => {
  const deviceID = req.params.id;
  Device.findOne({ _id: mongoose.Types.ObjectId(deviceID) }).exec(
    (err, singleDevice) => {
      if (err) {
        res.json("couldn't fetch device");
      } else {
        res.json(singleDevice);
      }
    }
  );
};

//UPDATE DEVICE
exports.updateDevice = (req, res) => {
  const deviceID = req.params.id;
  const { name, purpose, topic } = req.body;
  const dev_id = randId(30, "aA0");

  Device.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(deviceID) },
    { name: name, dev_id: dev_id, purpose: purpose, topic: topic }
  )
    .then((updatedDevice) => {
      res.json("updated successfully");
    })
    .catch((e) => {
      res.json({ error: e });
    });
};

//DELETE DEVICE
exports.deleteDevice = (req, res) => {
  const deviceID = req.params.id;
  Device.findByIdAndRemove({ _id: mongoose.Types.ObjectId(deviceID) })
    .then((del) => {
      res.json("device deleted successfulyy");
    })
    .catch((e) => console.log(e));
};
