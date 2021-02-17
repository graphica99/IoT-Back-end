const express = require("express");
const route = express.Router();
const { getData } = require("../controllers/data");
// route.get("/get-data", getData);

module.exports = route;
