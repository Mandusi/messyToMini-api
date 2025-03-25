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
