const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const summaryShema = new mongoose.Schema(
  {
    device: {
      type: Number,
      trim: true,
      required: true,
    },
    date: {
      type: String,
      trim: true,
      required: true,
    },
    mqttId: {
      type: String,
      required: true,
    },
    sensor: {
      type: String,
      required: true,
    },
    // device: [{ type: ObjectId, ref: "Device", require: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Summary", summaryShema);
