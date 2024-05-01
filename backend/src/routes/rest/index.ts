import { Request, Response, Router } from 'express'
import userRoutes from './userRoute'
import authRoutes from './authRoute'
import authMiddleware from '../../middleware/authentication'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Sensor Monitoring System API is running!')
})

router.use('/auth', authRoutes)
router.use('/user', authMiddleware, userRoutes)

export default router