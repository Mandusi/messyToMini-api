import { Request } from 'express'

export default interface ApiReq extends Request {
	body: any
	user: any
	lang: 'en' | 'tr'
	userId: string
}
