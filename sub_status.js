import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("SUB STATUS: conectado");
  client.subscribe(["Temp/status", "Agua/status", "Fogo/status"], { qos: 1 }, (err) => {
    if (err) {
      console.error("Falha ao assinar status:", err);
    } else {
      console.log("Assinado: Temp/status, Agua/status, Fogo/status");
    }
  });
});

client.on("message", (topic, msg) => {
  console.log(`STATUS RECEBIDO [${topic}]:`, msg.toString());
});
