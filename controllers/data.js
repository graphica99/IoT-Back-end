const Summary = require("../model/Summary");
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:8080");
const io = require("../socket");
const topic_val = "val";
const dateFormat = require("dateformat");
const Device = require("../model/Device");

client.on("connect", () => {
  client.subscribe(topic_val);
});

client.on("message", (topic, message) => {
  const messages = message.toString();
  var m = JSON.parse(messages);
  // setInterval(() => {
  for (var i = 0; i < m.length; i++) {
    var sensor = m[i].sensor;
    var mqttId = m[i].mqttId;

    const now = new Date();
    const newDate = dateFormat(now, "dddd,H:MM:ss TT");
    const summary = new Summary({
      device: m[i].value,
      date: newDate,
      mqttId: mqttId,
      sensor: sensor,
    });

    summary.save((err, data) => {
      if (err) console.log(err);
    });
  }
  // }, 60000);

  // console.log(m);

  //get mqttID from the object of the publisher
  // Device.find({ mqttId: "mqttId" })
  //   .then((data) => {
  //     //do something with the data
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  // const now = new Date();
  // const newDate = dateFormat(now, "dddd,H:MM:ss TT");
  // const summary = new Summary({
  //   device: m,
  //   date: newDate,
  //   // userId: ,
  // });

  // summary.save((err, data) => {
  //   if (err) console.log(err);
  // });
  io.getIO().emit("data", { message: m });
});
