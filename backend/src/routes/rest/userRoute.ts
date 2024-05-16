import { Router } from 'express'
import userController from '../../controllers/UserController'

const router = Router()

router.put('/update', userController.updateUser)
router.put('/grant-access', userController.grantAccessUser)
router.delete('/delete/:id', userController.deleteUser)

export default router