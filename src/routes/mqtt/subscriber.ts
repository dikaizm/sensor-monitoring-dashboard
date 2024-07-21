import fs from 'fs'
import path from 'path'
import mqtt, { MqttClient } from 'mqtt'
import mqttConfig from '../../config/mqtt'
import { fire } from '../../utils/firebase'
import { serverTimestamp } from 'firebase/firestore'
import { UltrasonicType } from '../../types/sensor'
import db from '../../models'
import { Op } from 'sequelize'

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
        console.log('[server]: mqtt connected');

        mqttClient.subscribe([topic], () => {
            console.log(`[server]: Subscribe to topic '${topic}'`)

            mqttClient.publish(topic, JSON.stringify({ 'message': 'Sensor mqtt test' }), { qos: 1, retain: true }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
        })
    })

    mqttClient.on('message', async (topic, payload) => {
        let data;
        try {
            const payloadStr = payload.toString()
            // console.log('Received Message:', topic, payloadStr)

            data = JSON.parse(payloadStr)
        } catch (error) {
            console.error(error)
        }

        // Save to database
        if (data.tag_name === 'ultrasonic' && (data.value === true)) {
            // Save record to firebase
            const ultrasonicData: UltrasonicType = {
                value: data.value,
                created_at: serverTimestamp()
            }
            fire.createDoc('ultrasonic', ultrasonicData)

            // Save record to database
            const todayCount = await db.Production.findOne({
                where: {
                    createdAt: {
                        [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
                        [Op.lt]: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                }
            });

            if (todayCount) {
                todayCount.quantity += 1;
                await todayCount.save();
            } else {
                await db.Production.create({ product_id: 1, quantity: 1 });
            }
        }
    })
}

function checkMqttConnection(): boolean {
    if (mqttClient.connected) {
        console.log('[server]: mqtt connected');
        return true
    } else {
        console.log('[server]: mqtt not connected');
        return false
    }
}

export { startMqttSubscriber, checkMqttConnection, mqttClient }