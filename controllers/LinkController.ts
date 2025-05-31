import AsyncMd from '../middleware/async'
import ApiReq from 'ApiReq'
import ApiRes from 'ApiRes'
import * as LinkService from '../services/LinkService'
import { UUID } from 'crypto'

export const createLink = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const link = await LinkService.createLink(req)
	res.json({
		success: true,
		data: link,
	})
})

export const getLink = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const url = await LinkService.getLink(req.params.slug, req.socket.remoteAddress)
	res.redirect(url)
})

export const getAllLinks = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const links = await LinkService.getAllLinks()
	res.json({
		success: true,
		data: links,
	})
})

export const deleteLink = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const link = await LinkService.deleteLink(req.params.id as UUID, req.user.id)
	res.json({
		success: true,
		data: link,
	})
})
