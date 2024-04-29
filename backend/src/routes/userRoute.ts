import { Router } from 'express'
import userController from '../controllers/UserController'

const router = Router()

router.put('/update', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

export default router