import { Router } from "express";
import db from "../../models";
import authMiddleware from "../../middleware/authentication";

const router = Router()

router.get('/toggle', authMiddleware, async (req, res) => {
    try {
        const conveyor = await db.Sensor.findOne({ where: { name: 'conveyor' } })
        if (!conveyor) {
            return res.status(404).send({ success: false, error: 'Conveyor not found' })
        }

        // Toggle conveyor status
        const status = !conveyor.is_active
        const dbRes = await db.Sensor.update({ is_active: status }, { where: { name: 'conveyor' } })
        if (!dbRes) {
            return res.status(500).send({ success: false, error: 'Failed to toggle conveyor status' })
        }
        // Set sensor active time to start
        if (status) {
            await db.SensorActiveTime.create({ sensor_id: conveyor.id, start_time: new Date(), client_id: req.ip })
        } else {
            // Set sensor active time to end
            const activeTime = await db.SensorActiveTime.findOne({ where: { sensor_id: conveyor.id, end_time: null, client_id: req.ip }, order: [['start_time', 'DESC']] })
            
            if (activeTime) {
                const currentTime = new Date()
                const runningSec = Math.floor((currentTime.getTime() - activeTime.start_time.getTime()) / 1000)
                await activeTime.update({ end_time: currentTime, running_sec: runningSec })
            }
        }

        // Send response as json
        res.status(200).send({ success: true, message: 'Toggle command sent!', data: { status } })
    } catch (error: any) {
        // Send error as json
        res.status(500).send({ success: false, error: error.message })
    }
})

router.get('/status', async (req, res) => {
    try {
        const conveyor = await db.Sensor.findOne({ where: { name: 'conveyor' } })
        if (!conveyor) {
            return res.status(404).send({ message: 'Conveyor not found' })
        }

        // Send response as json
        res.status(200).send({ message: 'Success get status', data: { status: conveyor.is_active } })
    } catch (error: any) {
        // Send error as json
        res.status(500).send({ message: error.message })
    }
})

export default router