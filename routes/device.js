const express = require("express");
const route = express.Router();
const { addDeviceValidator } = require("../validation/device");
const { runValidation } = require("../validation/index");
const {
  addDevice,
  updateDevice,
  deleteDevice,
  getDevices,
  getSingleDevice,
} = require("../controllers/device");

const { authenticated } = require("../middlewares/auth");
route.get("/all-device", authenticated, getDevices);
route.get("/single-device/:id", getSingleDevice);

route.post(
  "/add-device",
  addDeviceValidator,
  runValidation,
  authenticated,
  addDevice
);
route.put("/update-device/:id", updateDevice);
route.delete("/delete-device/:id", deleteDevice);

module.exports = route;
