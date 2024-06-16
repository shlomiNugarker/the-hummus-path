import express from 'express'

import userController from './userController'

const router = express.Router()

router.get('/:email', userController.getUserByEmail)
router.put('/:id', userController.updateUser)
router.post('/', userController.addUser)

export default router
