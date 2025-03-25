import ApiReq from 'ApiReq'
import ApiRes from 'ApiRes'
import { ErrorRequestHandler, NextFunction } from 'express'

function handleErr(err: Error, req: ApiReq, res: ApiRes, next: NextFunction) {
	console.log(err)
	// send response
	res.status(500).json({ success: false, error: err?.message || 'Internal Server Error' })
}

export default handleErr as ErrorRequestHandler
