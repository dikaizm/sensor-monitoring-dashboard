import { Request, Response, Router } from 'express'
import userRoutes from './userRoute'
import authRoutes from './authRoute'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Sensor Monitoring System API is running!')
})

router.use('/user', userRoutes)
router.use('/auth', authRoutes)

export default router