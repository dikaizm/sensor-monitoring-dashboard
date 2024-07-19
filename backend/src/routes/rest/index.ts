import { Request, Response, Router } from 'express'
import userRoutes from './userRoute'
import authRoutes from './authRoute'
import productRoutes from './productRoute'
import authMiddleware from '../../middleware/authentication'
import sensorRoutes from './sensorRoute'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Sensor Monitoring System API is running!')
})

router.use('/auth', authRoutes)
router.use('/user', authMiddleware, userRoutes)
router.use('/product', authMiddleware, productRoutes)
router.use('/sensor/conveyor', sensorRoutes)

export default router