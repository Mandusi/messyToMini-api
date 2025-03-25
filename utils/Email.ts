import nodemailer from 'nodemailer'
import EmailRenderer from './EmailRenderer'
import EmailConfigs from '../config/EmailConfigs.json'

// TRANSPORTER OPTIONS
const transport = nodemailer.createTransport({
	host: EmailConfigs.transport.host,
	port: EmailConfigs.transport.port,
	requireTLS: true,
	secure: true,
	auth: {
		user: EmailConfigs.from.address,
		pass: EmailConfigs.password,
	},
	tls: { ciphers: 'SSLv3' },
})

type SendOptions = {
	to: string | string[]
	subject: string
	template: string
}

// SEND EMAIL
export async function send(opts: SendOptions, context: any) {
	try {
		// render email template
		const html = await EmailRenderer(opts.template, context)
		// send email
		await transport.sendMail({
			from: EmailConfigs.from.address,
			to: opts.to,
			subject: opts.subject,
			html,
		})
	} catch (error) {
		console.log(error)
	}
}
