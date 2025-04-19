import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import Prisma from './utils/Prisma'
import env from './utils/Env'

import * as FsUtils from './utils/FsUtils'

// Load env
env()

// Routers
import AuthRouter from './routes/v1/auth'
import LinkRouter from './routes/v1/link'

// Error Middleware
import ErrorMd from './middleware/error'

async function start() {
	// connect to db
	await Prisma.$connect()

	// init app
	const app = express()

	// set CORS
	app.use(cors({ origin: 'http://localhost:3098', credentials: true }))

	// set express options
	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())

	// set cookie-Parser
	app.use(cookieParser())

	// register routers
	app.use('/api/v1/auth', AuthRouter)
	app.use('/api/v1/link', LinkRouter)

	// serve public folder
	app.use('/api/v1/public', express.static(FsUtils.path('public')))

	// use custom error handler
	app.use(ErrorMd)

	// get port
	const port = process.env.DEFAULT_PORT || process.env.PORT

	// start app
	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log('Service running on port', port)
	})
}

start()
