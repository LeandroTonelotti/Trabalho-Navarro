import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("SUB QoS0: conectado");

  client.subscribe({
    "Temp/qos": { qos: 0 },
    "Temp/status": { qos: 0 }
  }, (err) => {
    if (err) {
      console.log("Erro ao se inscrever:", err);
    } else {
      console.log("Inscrito nos tópicos!");
    }
  });
});

client.on("message", (topic, msg) => {
  if (topic === "Temp/status") {
    console.log("STATUS TEMP:", msg.toString());
  } else if (topic === "Temp/qos") {
    console.log("Temperatura:", msg.toString());
  }
});

client.on("error", (err) => {
  console.log("Erro na conexão:", err);
});