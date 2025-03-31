import { promises as fs, createReadStream, createWriteStream, statSync } from 'fs'

// GET ABSOLUTE PATH
// following function will return absolute path of the file or folder
export function path(...dirs: string[]) {
	return [process.cwd(), ...dirs].join('/')
}

// GET FOLDERS
// following function will return list of folders in the given directory
export async function folders(parent: string) {
	const subs = await fs.readdir(parent, { withFileTypes: true })
	return subs.filter(d => d.isDirectory()).map(d => d.name)
}

// GET FILES
// following function will return list of folders in the given directory
export async function files(parent: string) {
	const subs = await fs.readdir(parent, { withFileTypes: true })
	return subs.filter(d => !d.isDirectory()).map(d => d.name)
}

// CREATE A WRITE STREAM
// following function will create a write stream to given directory
export function writeStream(f: string) {
	return createWriteStream(f)
}

// CREATE A READ STREAM
// following function will create a read stream to given directory
export function readStream(f: string) {
	return createReadStream(f)
}

// RETURN META DATA OF THE FILE
// following function will return meta data of the given directory
export function meta(f: string) {
	return statSync(f)
}

// REMOVE DIRECTORY
// following function will remove the given directory
export async function remove(f: string) {
	return fs.unlink(f).catch(() => {})
}

// MOVE FILE
// following function will move the file from source to target
export async function move(source: string, target: string) {
	return fs.rename(source, target)
}

// WRITE BUFFER TO FILE
// following function will write content to the given directory
export async function save(f: string, content: any) {
	return fs.writeFile(f, content)
}

// READ FILE
// following function will read the given directory
export async function read(f: string, opts?: any) {
	const buffer = await fs.readFile(f, opts)
	return buffer.toString()
}

// CREATE DIRECTORY
// following function will create the given directory
export async function mkdir(f: string) {
	return fs.mkdir(f)
}

// CHECK
// following function will check if the given directory exists
export async function exists(f: string) {
	try {
		await fs.access(f)
		return true
	} catch (e) {
		return false
	}
}

// TXT TO JSON
// following function returns an array of strings from the given .txt file
export async function txtToJson(f: string) {
	const data = await fs.readFile(f, 'utf-8')
	const words = data.split(/\s+/)
	return words
}

export async function createJSONFile(f: string, c: object) {
	await fs.writeFile(f, JSON.stringify(c))
}
