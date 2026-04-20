import mqtt from "mqtt";

const options = {
  clientId: "sensor_temp",
  will: {
    topic: "Temp/status",
    payload: "offline",
    qos: 0,
    retain: true
  }
};

const client = mqtt.connect("mqtt://localhost:1883", options);

client.on("connect", () => {
  console.log("Sensor conectado");

  // publica que está ONLINE (com retain)
  client.publish("Temp/status", "online", { qos: 0, retain: true });

  setInterval(() => {
    const temperatura = (Math.random() * (35 - 20) + 20).toFixed(2);

    // 🔥 agora com retain
    client.publish("Temp/qos", temperatura, { qos: 0, retain: true });

    console.log("Temperatura: C°", temperatura);
  }, 1000);
});