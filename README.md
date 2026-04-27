O Last Will (LWT) funciona como um aviso automático quando um cliente perde a conexão de forma inesperada. Ao se conectar ao broker, o cliente pode definir uma mensagem que ficará registrada. Caso a conexão seja interrompida sem aviso, o próprio broker se encarrega de publicar essa mensagem em um tópico específico. Esse recurso é muito útil em sistemas com sensores ou dispositivos conectados, pois permite identificar rapidamente falhas, mesmo quando o dispositivo não consegue enviar uma notificação por conta própria.

A retain flag é utilizada para manter armazenada a última mensagem publicada em um determinado tópico. Quando uma mensagem é enviada com retain = true, o broker guarda essa informação. Assim, sempre que um novo cliente se inscreve nesse tópico, ele recebe imediatamente a última mensagem armazenada, sem precisar aguardar uma nova publicação. Por exemplo, se um sensor publica o status “online” com retain ativado, qualquer cliente que se conectar depois já saberá que o sensor está ativo.



HIVEMQTT
export MQTT_URL="mqtts://c56df61ad073466c8b119e8e0fcb9bfc.s1.eu.hivemq.cloud:8883"
export MQTT_USER="Leandro"
export MQTT_PASS="Lhit156@"
node pub2_Fogo.js


MOSQUITTO
unset MQTT_URL MQTT_USER MQTT_PASS
node pub2_Fogo.js