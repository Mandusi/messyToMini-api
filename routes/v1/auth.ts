import express from 'express'
import { protect, userValidation } from '../../middleware/auth'
import Uploader from '../../middleware/upload'
import * as AuthController from '../../controllers/AuthController'

const router = express.Router()

router.post('/sign-up', userValidation, AuthController.signUp)

router.post('/login', AuthController.login)

router.post('/forgot-password', AuthController.forgotPassword)

router.post('/reset-password', AuthController.resetPassword)

router.put('/change-password', protect, AuthController.changePassword)

router.post('/profile-img', protect, Uploader.single(2), AuthController.uploadProfileImg)

router.get('/me', protect, AuthController.getMe)

export default router
