import express, { Express } from 'express'
import dotenv from 'dotenv'
import router from './routes/rest'
import path from 'path'
import cors from 'cors'
import startMqttSubscriber from './utils/subscriber'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

startMqttSubscriber()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', router)
console.log('[server]: Router loaded');

app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`)
})