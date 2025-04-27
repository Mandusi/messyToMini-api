import AsyncMd from '../middleware/async'
import ApiReq from 'ApiReq'
import ApiRes from 'ApiRes'
import * as AuthService from '../services/AuthService'

export const signUp = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const user = await AuthService.signUp(req.body)
	res.json({
		success: true,
		data: user,
	})
})

export const login = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const authPayload = await AuthService.login(req.body)
	res.json({ success: true, data: authPayload })
})

export const refreshLogin = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const token = req.get('RefreshToken') as string
	const authPayload = await AuthService.refreshLogin(token)
	res.json({ success: true, data: authPayload })
})

export const forgotPassword = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	await AuthService.forgotPassword(req.body.email)
	res.json({
		success: true,
		message: 'A reset password link is sent to your email address.',
	})
})

export const resetPassword = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	await AuthService.resetPassword(req.body)
	res.json({
		success: true,
		message: 'Password Resetted.',
	})
})

export const changePassword = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	await AuthService.changePassword(req.body)
	res.json({
		success: true,
		message: 'Password Changed.',
	})
})
export const uploadProfileImg = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const buffer = req?.file?.buffer as Buffer
	const username = req.user.username
	await AuthService.uploadProfileImg(username, buffer)
	res.json({
		success: true,
		message: 'Profile photo uploaded.',
	})
})

export const getMe = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const user = await AuthService.getMe(req.user)
	res.json({
		success: true,
		data: user,
	})
})
