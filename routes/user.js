const express = require("express");
const route = express.Router();
const { signup, login } = require("../controllers/user");

route.post("/sign-up", signup);
route.post("/log-in", login);
module.exports = route;
