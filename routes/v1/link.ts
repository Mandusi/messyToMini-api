import express from 'express'
import * as LinkController from '../../controllers/LinkController'
import { protect } from '../../middleware/auth'

const router = express.Router()

router.post('/', protect, LinkController.createLink)

router.get('/', LinkController.getAllLinks)

router.get('/:slug', LinkController.getLink)

export default router
