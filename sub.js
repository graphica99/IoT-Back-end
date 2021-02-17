const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:8080");
const Device = require("./model/Device");
const topic = "device";

// const topic = "test";

//eg adding a device to the system
/**
 * mqtt username and password (for the users of the app) like some signup
 * first device name
 * generate id for the device
 */

//eg subscribing from a temperature sensor
/**
 * id will be sent along side the message the sensor is publishing
 * look into the db find id in the db that matches the id from the sensor
 * save the message from the publisher
 * if matches then subscribe to the topic from the device and save the topic name
 */

//eg displaying message from the publisher
/**
 * once the system identify the id of the sensor
 * it will be displayed using web sockets
 */

//eg if values form the sensor is two values:
/**
 * you can use the 'split()' method to split it into two
 * and
 */

client.on("connect", () => {
  // Device.find({mqttId:mqttId})
  client.subscribe(topic);
});

client.on("message", (topic, message) => {
  const messages = message.toString();
});
