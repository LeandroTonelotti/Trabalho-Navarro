import mqtt from "mqtt";

const options = {
  clientId: "subscriber_01",
  clean: false
};

const client = mqtt.connect("mqtt://localhost:1883", options);

client.on("connect", () => {
  console.log("SUB QoS2: conectado (sessão persistente)");

  client.subscribe({
    "Fogo/qos": { qos: 2 },
    "Fogo/status": { qos: 2 }
  });
});

client.on("message", (topic, msg) => {
  if (topic === "Fogo/status") {
    console.log("STATUS FOGO:", msg.toString());
  } else if (topic === "Fogo/qos") {
    console.log("Recebido:", msg.toString());
  }
});

client.on("error", (err) => {
  console.log("Erro na conexão:", err);
});