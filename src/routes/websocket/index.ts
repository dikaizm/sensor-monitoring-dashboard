import WebSocket from 'ws'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import { MqttClient } from 'mqtt'
import { checkMqttConnection } from '../mqtt/subscriber';
import db from '../../models';
import { Op } from 'sequelize';

export default function startWebsocketServer(server: any, mqttClient: MqttClient) {
    const wss = new WebSocket.Server({ server });

    console.log('[server]: WebSocket server is running');

    wss.on('connection', (ws: any, req) => {
        const params = new URLSearchParams(req.url?.split('?')[1]);

        const token = params.get('session')

        if (!token) {
            console.log('No token provided');

            ws.close(1002, 'Protocol error');
            return;
        }

        jwt.verify(token, authConfig.secret, (err, decoded: any) => {
            if (err) {
                console.log('Invalid token');

                ws.close(1008, 'Unauthorized');
                return;
            }

            ws.email = decoded.email;

            ws.on('message', (message: any) => {
                console.log(`Received message from ${ws.email}: ${message}`);
            });

            if (!checkMqttConnection()) {
                ws.send(JSON.stringify({ "message": "Gagal terhubung ke sensor", "message_type": "alert", "status": "error" }));
                ws.close(1006, 'Server error');
                return;
            }

            ws.send(JSON.stringify({ "message": "Terhubung ke sensor", "message_type": "alert", "status": "success" }));

            mqttClient.on('message', async (topic, payload) => {
                const payloadStr = payload.toString()
                // console.log('Received Message:', topic, payloadStr)

                const data = JSON.parse(payloadStr)
                if (data.tag_name === 'ultrasonic' && data.value) {
                    const todayCount = await db.Production.findOne({
                        where: {
                            createdAt: {
                                [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
                                [Op.lt]: new Date(new Date().setHours(23, 59, 59, 999))
                            }
                        }
                    });

                    data.value = todayCount ? todayCount.quantity : 0

                    ws.send(JSON.stringify(data))
                } else {
                    ws.send(payloadStr)
                }

            })
        });
    })
}