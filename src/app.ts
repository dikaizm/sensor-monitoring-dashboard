import express, { Express } from 'express'
import dotenv from 'dotenv'
import router from './routes/rest'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import { startMqttSubscriber, mqttClient } from './routes/mqtt/subscriber'
import startWebsocketServer from './routes/websocket'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

const corsOption = {
    origin: '*',
    credentials: true,
}

app.use(cors(corsOption))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', router)
console.log('[server]: Router loaded');

startMqttSubscriber()
const server = http.createServer(app)
startWebsocketServer(server, mqttClient)

server.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`)
})