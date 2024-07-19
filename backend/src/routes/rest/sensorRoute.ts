import { Router } from "express";
import db from "../../models";

const router = Router()

router.get('/toggle', async (req, res) => {
    try {
        const conveyor = await db.Sensor.findOne({ where: { name: 'conveyor' } })
        if (!conveyor) {
            return res.status(404).send({ message: 'Conveyor not found' })
        }

        // Toggle conveyor status
        const status = !conveyor.is_active
        await db.Sensor.update({ is_active: status }, { where: { name: 'conveyor' } })

        // Send response as json
        res.status(200).send({ message: 'Toggle command sent!', data: { status } })
    } catch (error: any) {
        // Send error as json
        res.status(500).send({ message: error.message })
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