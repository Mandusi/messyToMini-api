import AsyncMd from '../middleware/async'
import ApiReq from 'ApiReq'
import ApiRes from 'ApiRes'
import * as LinkService from '../services/LinkService'

export const shortener = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const link = await LinkService.shortener(req.body)
	res.json({
		success: true,
		data: link,
	})
})

export const getLink = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	try {
		const url = await LinkService.getLink(req.params.slug, req.socket.remoteAddress)
		res.redirect(url)
	} catch (error) {
		res.json({
			success: false,
			message: error,
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
