import express from 'express'
import * as LinkController from '../../controllers/LinkController'

const router = express.Router()

router.post('/', LinkController.shortener)

router.get('/', LinkController.getAllLinks)

router.get('/:slug', LinkController.getLink)

export default router
