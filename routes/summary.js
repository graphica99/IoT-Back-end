const express = require("express");
const Route = express.Router();
const { getSummary, downloadSummary } = require("../controllers/summary");

Route.get("/get-summary-data/:sensor", getSummary);
Route.get("/download-summary-data/:device", downloadSummary);
module.exports = Route;
