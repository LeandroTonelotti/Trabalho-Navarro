import mqtt from "mqtt";

// usa HiveMQ se tiver variável, senão Mosquitto
const brokerUrl = process.env.MQTT_URL || "mqtt://localhost:1883";

const options = {
  clientId: "sensorfogo_" + Math.random().toString(16).slice(2),
  clean: true,
  will: {
    topic: "Fogo/status",
    payload: "Sensor FOGO desconectado inesperadamente",
    qos: 2,
    retain: true
  }
};

// só adiciona user/senha se existir
if (process.env.MQTT_USER && process.env.MQTT_PASS) {
  options.username = process.env.MQTT_USER;
  options.password = process.env.MQTT_PASS;
  options.rejectUnauthorized = false; // necessário pro HiveMQ
}

const client = mqtt.connect(brokerUrl, options);

client.on("connect", () => {
  console.log("Conectado em:", brokerUrl);

  setInterval(() => {
    const detectouFogo = Math.random() < 0.5;

    if (detectouFogo) {
      client.publish("Fogo/qos", "FOGO DETECTADO", { qos: 2 });
      console.log("FOGO DETECTADO!");
    } else {
      client.publish("Fogo/qos", "Sem Fogo", { qos: 2 });
      console.log("Seguro");
    }
  }, 5000);
});

client.on("error", (err) => {
  console.error("Erro:", err.message);
});