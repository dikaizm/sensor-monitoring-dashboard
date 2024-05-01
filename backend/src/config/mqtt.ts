type MqttConfigType = {
    user: string,
    password: string,
    protocol: string,
    host: string,
    port: number,
    topic: string
}

const mqttConfig: MqttConfigType = {
    user: process.env.MQTT_USER || '',
    password: process.env.MQTT_PASSWORD || '',
    protocol: process.env.MQTT_PROTOCOL || '',
    host: process.env.MQTT_HOST || '',
    port: process.env.MQTT_PORT ? parseInt(process.env.MQTT_PORT) : 0,
    topic: process.env.MQTT_TOPIC || ''
}

export default mqttConfig