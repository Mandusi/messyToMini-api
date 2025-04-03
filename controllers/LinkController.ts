import AsyncMd from '../middleware/async'
import ApiReq from 'ApiReq'
import ApiRes from 'ApiRes'
import * as LinkService from '../services/LinkService'

export const createLink = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	try {
		const link = await LinkService.createLink(req)
		res.json({
			success: true,
			data: link,
		})
	} catch (error: any) {
		res.json({
			success: false,
			message: error.message,
		})
	}
})

export const getLink = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	try {
		const url = await LinkService.getLink(req.params.slug, req.socket.remoteAddress)
		res.redirect(url)
	} catch (error) {
		res.json({
			success: false,
			message: (error as Error).message,
		})
	}
})

export const getAllLinks = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	try {
		const links = await LinkService.getAllLinks()
		res.json({
			success: true,
			data: links,
		})
	} catch (error) {
		res.json({
			success: false,
			message: error,
		})
	}
})
