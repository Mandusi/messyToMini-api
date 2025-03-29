import ApiReq from 'ApiReq'
import AsnycMd from '../middleware/async'
import ApiRes from 'ApiRes'
import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const protect = AsnycMd(async (req: ApiReq, res: ApiRes, next: NextFunction) => {
	const token = req.headers['authorization']?.split(' ')[1]

	if (!token) throw Error('No Token!')

	jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
		if (err) throw err
		req.user = user
		next()
	})
})

export const userValidation = AsnycMd(
	async (req: ApiReq, res: ApiRes, next: NextFunction) => {
		if (!req.body.username) throw Error('Username is required!')

		if (req.body.username.length < 4)
			throw Error('Username must be at least 4 characters!')

		if (req.body.firstname === '' || req.body.lastName === '')
			throw Error('First and last name field must be filled!')

		if (!req.body.email) throw Error('Email is required!')

		const emailRGX = /^\S+@\S+\.\S+$/
		if (emailRGX.test(req.body.email)) throw Error('Email is no valid!')

		if (req.body.password.length < 8)
			throw Error('Password must be at least 8 characters!')

		next()
	}
)
