import lodash from 'lodash'
import { v4 } from 'uuid'
import mime from 'mime-types'

// GENERATE UNIQUE ID
// following function is used to generate unique id
export function uuid() {
	return v4()
}

// PIN
// following function is used to generate pin
export function pin(length: number) {
	const chars = '0123456789'
	return lodash.sampleSize(chars, length).join('')
}

// RANDOM STRING
// following function generates random string
export function rand(length: number): string {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	return lodash.sampleSize(chars, length).join('')
}

// TRIM WHITESPACE
// following function trims whitespace from string
export function trim(str: string) {
	if (!str) return ''
	return str.replace(/\s/g, '')
}

// TRIM WHITESPACE AT START AND END
// following function trims whitespace from start and end of string
export function trimOuter(str: string) {
	if (!str) return ''
	return str.replace(/^\s+|\s+$/g, '')
}

// GET EXTENSION FROM MIME TYPE
// following function returns extension from mime type
export function getExt(f: any) {
	const ext = mime.extension(f.mimetype)
	if (ext) return ext
	const exts = f.originalname.split('.')
	return exts[exts.length - 1]
}

// GET MIME TYPE
// following function returns mime type from file
export function getMime(f: any) {
	return f.mimetype || mime.lookup(f.originalname)
}

// GET TIME LABEL
// following function returns time label in 24 hour format
// @millis - time since the start of the day in milliseconds
export function getTimeLabel(millis: number) {
	const hours = Math.floor(millis / 3600000)
	const minutes = Math.floor((millis % 3600000) / 60000)
	return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
}
