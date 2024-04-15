import { Request, Response, Router } from 'express'
import userRoutes from './userRoutes'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Sensor Monitoring System API is running!')
})

router.use('/user', userRoutes)

export default router