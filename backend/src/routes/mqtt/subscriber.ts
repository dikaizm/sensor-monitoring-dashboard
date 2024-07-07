import fs from 'fs'
import path from 'path'
import mqtt, { MqttClient } from 'mqtt'
import mqttConfig from '../../config/mqtt'
import { fire } from '../../utils/firebase'
import { PhotoelectricType } from '../../types/sensor'

const mqttOptions = {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    clean: true,
    connectTimeout: 4000,
    username: mqttConfig.user,
    password: mqttConfig.password,
    reconnectPeriod: 1000,

    ca: fs.readFileSync(path.join(__dirname, '../../../certs/emqxsl-ca.crt')),
}

const urlConfig = {
    protocol: mqttConfig.protocol,
    host: mqttConfig.host,
    port: mqttConfig.port
}

const connectUrl = `${urlConfig.protocol}://${urlConfig.host}:${urlConfig.port}`

const mqttClient: MqttClient = mqtt.connect(connectUrl, mqttOptions)

const topic: string = mqttConfig.topic

function startMqttSubscriber() {
    mqttClient.on('connect', () => {
        console.log('mqtt connected');

        mqttClient.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`)

            mqttClient.publish(topic, JSON.stringify({ 'message': 'Sensor mqtt test' }), { qos: 1, retain: true }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
        })
    })

    mqttClient.on('message', (topic, payload) => {
        const payloadStr = payload.toString()
        // console.log('Received Message:', topic, payloadStr)

        const data = JSON.parse(payloadStr)        

        // Save to database
        if (data.tag_name === 'photoelectric') {
            const photoelectricData: PhotoelectricType = {
                status: data.value,
                created_at: data.timestamp
            }

            fire.createDoc('photoelectric', photoelectricData)
        }
    })
}

export { startMqttSubscriber, mqttClient }