const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:8080");
const topic_dev = "device";
const topic_val = "val";
var toBuffer = require("typedarray-to-buffer");
//eg publishing a data to the client
/**
 * establish a connection a connection to the broker({mqtt-id:mqtt-pass:client-id:netword-link})
 * error must be handles if do  esn't connect.
 * then the device start publishing with a topic and a message
 */

//eg publishing a data to the client
/**
 * establish a connection using the (SSID_name and password for the SSID)
 * the client Id can come from the db. and then giving it to the sensor.
 * when the user publish a message to the broker, the client id is matched with
 * what is inside the db and if it matches we subscribe else we dont
 */
client.on("connect", () => {
  setInterval(() => {
    const rndNumHum = Math.floor(Math.random() * 60);
    const rndNumTemp = Math.floor(Math.random() * 60);
    const rndNumMos = Math.floor(Math.random() * 60);
    const data = [
      {
        sensor: "temperature",
        value: rndNumTemp,
        topic: "temp",
        mqttId: "123",
      },
      { sensor: "humidity", value: rndNumHum, topic: "hum", mqttId: "123" },
      // { sensor: "moisture", value: rndNumMos, topic: "mos" },
    ];
    const mess = JSON.stringify(data);
    client.publish(topic_val, mess);
  }, 10000);
});

client.on("connect", () => {
  const message = "ZfqpXHJfBtk1NWjmg6ZTAZQPzuMj81";
  const mess = message.toString();
  client.publish(topic_dev, mess);
});
