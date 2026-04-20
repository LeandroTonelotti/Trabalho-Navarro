import mqtt from "mqtt";

const options = {
  clientId: "sensor_agua",
  will: {
    topic: "Agua/status",
    payload: "Sensor AGUA desconectado inesperadamente",
    qos: 1,
    retain: true
  }
};

const client = mqtt.connect("mqtt://localhost:1883", options);

client.on("connect", () => {
  console.log("Sensor Água conectado");

  setInterval(() => {
    // nível aleatório entre 0% e 100%
    const nivel = (Math.random() * 100).toFixed(1);

    client.publish("Agua/qos", nivel, { qos: 1 });

    console.log("Nível de água:", nivel + "%");
  }, 3000); // a cada 30 segundos
});