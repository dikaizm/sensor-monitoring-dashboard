import { Request, Response, Router } from 'express'
import userRoutes from './userRoute'
import authRoutes from './authRoute'
import productRoutes from './productRoute'
import authMiddleware from '../../middleware/authentication'
import sensorRoutes from './sensorRoute'

const router = Router()

const clients = new Map<string, { lastActive: number; timeout: NodeJS.Timeout }>();
const INACTIVITY_TIMEOUT = 2000; // 10 seconds
// Middleware to track clients' requests
router.use((req, res, next) => {
    const type = req.query.type;

    if (type === 'plc') {
        const clientId = req.ip; // Use a more specific identifier if needed
        console.log(clientId);
        const currentTime = Date.now();

        if (clientId) {
            // If client already exists, clear the existing timeout
            if (clients.has(clientId)) {
                clearTimeout(clients.get(clientId)!.timeout);
            }

            // Set a new inactivity timeout
            const timeout = setTimeout(() => {
                console.log(`Client ${clientId} is inactive. Recording end time: ${new Date(currentTime)}`);
                // Record the sensor activity end time here
                clients.delete(clientId);
            }, INACTIVITY_TIMEOUT);

            // Update the client's last active time and timeout
            clients.set(clientId, { lastActive: currentTime, timeout });
        }
    }

    next();
});

router.get('/', (req: Request, res: Response) => {
    res.send('Sensor Monitoring System API is running!')
})

router.use('/auth', authRoutes)
router.use('/user', authMiddleware, userRoutes)
router.use('/product', authMiddleware, productRoutes)
router.use('/sensor/conveyor', sensorRoutes)

export default router