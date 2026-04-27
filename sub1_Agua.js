import mqtt from "mqtt";

const options = {
  clientId: "subscriber_agua",
  clean: false
};

const client = mqtt.connect("mqtt://localhost:1883", options);

client.on("connect", (connack) => {
  console.log(`SUB QoS1: conectado (Sessão recuperada: ${connack.sessionPresent})`);

  client.subscribe({
    "Agua/qos": { qos: 1 },
    "Agua/status": { qos: 1 }
  }, (err) => {
    if (err) {
      console.log("Erro ao se inscrever:", err);
    } else {
      console.log("Inscrito nos tópicos!");
    }
  });
});

client.on("message", (topic, msg) => {
  if (topic === "Agua/status") {
    console.log("STATUS AGUA:", msg.toString());
  } else if (topic === "Agua/qos") {
    console.log("Nivel de água:", msg.toString());
  }
});

client.on("error", (err) => {
  console.log("Erro na conexão:", err);
});