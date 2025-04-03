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
		console.log(user)
		next()
	})
})

export const userValidation = AsnycMd(
	async (req: ApiReq, res: ApiRes, next: NextFunction) => {
		if (!req.body.username) throw new Error('Username is required!')

		if (req.body.username.trim().length < 4)
			throw new Error('Username must be at least 4 characters!')

		if (req.body.firstname === '' || req.body.lastName === '')
			throw new Error('First and last name field must be filled!')

		if (!req.body.email) throw new Error('Email is required!')

		const emailRGX = /^\S+@\S+\.\S+$/
		if (!emailRGX.test(req.body.email)) throw new Error('Email is not valid!')

		if (req.body.password.length < 8)
			throw new Error('Password must be at least 8 characters!')

		next()
	}
)
