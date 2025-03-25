import fs from 'fs'
import { exec } from 'child_process'

const output = './prisma/schema.prisma'

const config = './prisma/config.prisma'

const schemas = fs
	.readdirSync('./prisma/schemas')
	.filter(file => file.endsWith('.prisma'))
	.map(file => `./prisma/schemas/${file}`)

async function main() {
	// clear content of filej
	fs.writeFileSync(output, '')

	// write header
	fs.appendFileSync(output, fs.readFileSync(config))

	for (const schema of schemas) {
		// append schema to file
		fs.appendFileSync(output, fs.readFileSync(schema))
		fs.appendFileSync(output, '\n')
	}

	// generate prisma client
	const command = exec(`pnpm prisma generate`)

	command.stdout?.pipe(process.stdout)
	command.stderr?.pipe(process.stderr)

	await new Promise((resolve, reject) => {
		command.on('close', code => {
			if (code === 0) resolve(true)
			else reject()
		})
	})
}

main()
