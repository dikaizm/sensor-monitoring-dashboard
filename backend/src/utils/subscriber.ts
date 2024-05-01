import fs from 'fs'
import path from 'path'
import mqtt from 'mqtt'
import mqttConfig from '../config/mqtt'

const mqttOptions = {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    clean: true,
    connectTimeout: 4000,
    username: mqttConfig.user,
    password: mqttConfig.password,
    reconnectPeriod: 1000,

    ca: fs.readFileSync(path.join(__dirname, '../../certs/emqxsl-ca.crt')),
}

const urlConfig = {
    protocol: mqttConfig.protocol,
    host: mqttConfig.host,
    port: mqttConfig.port
}

const connectUrl = `${urlConfig.protocol}://${urlConfig.host}:${urlConfig.port}`

const client = mqtt.connect(connectUrl, mqttOptions)

const topic: string = mqttConfig.topic

export default function startMqttSubscriber() {
    client.on('connect', () => {
        console.log('mqtt connected');

        client.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`)

            client.publish(topic, 'sensor mqtt test', { qos: 1, retain: true }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
        })
    })

    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
    })
}