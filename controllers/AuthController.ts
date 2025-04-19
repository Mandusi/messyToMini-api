import AsyncMd from '../middleware/async'
import ApiReq from 'ApiReq'
import ApiRes from 'ApiRes'
import * as AuthService from '../services/AuthService'

export const signUp = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	try {
		const user = await AuthService.signUp(req.body)
		res.json({
			success: true,
			data: user,
		})
	} catch (error) {
		res.status(401).json({ error: error })
	}
})

export const login = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	try {
		const token = await AuthService.login(req.body)

		res.cookie('refreshToken', token.refreshToken, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			sameSite: 'lax',
		})

		res.json({
			success: true,
			token: token.accessToken,
		})
	} catch (error) {
		res.status(401).json({ error: error })
	}
})

export const refreshToken = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const token = req.cookies.refreshToken
	console.log('token: ')
	console.log(token)
	if (!token) {
		res.status(401).json({ error: 'no refresh token' })
	}

	try {
		const newAccessToken = await AuthService.refreshToken(token)
		res.json({
			success: true,
			token: newAccessToken,
		})
	} catch (error) {
		res.status(401).json({ error })
	}
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
