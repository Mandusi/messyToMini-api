import crypto from 'crypto'

// RANDOM HEX
// generates a random hex string
export function hex(length: number = 36) {
	return crypto.randomBytes(length).toString('hex')
}
