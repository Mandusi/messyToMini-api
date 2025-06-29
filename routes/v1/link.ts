import express from 'express'
import * as LinkController from '../../controllers/LinkController'
import { protect } from '../../middleware/auth'

const router = express.Router()

router.post('/', protect, LinkController.createLink)

router.post('/guest', LinkController.createLink)

router.get('/', LinkController.getAllLinks)

router.get('/:slug', LinkController.getLink)

router.delete('/:id', protect, LinkController.deleteLink)

export default router
