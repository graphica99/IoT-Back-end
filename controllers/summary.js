const Summary = require("../model/Summary");

exports.getSummary = (req, res) => {
  var sensor = req.params.sensor;
  // console.log(sensor);
  Summary.find({ sensor: sensor })
    .limit(20)
    .sort({ createdAt: -1 })
    .exec((err, summary) => {
      if (err) res.json(err);
      else {
        res.json(summary);
      }
    });
};

exports.downloadSummary = async (req, res) => {
  const deviceId = req.params.device;
  const deviceData = await Summary.findById(deviceId);
  //add logic to download data
};
