import { Router } from 'express'
import userController from '../controllers/UserController'

const router = Router()

router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

export default router