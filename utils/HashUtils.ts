import bycrypt from 'bcryptjs'

// HASH
// creates hashed version of string
export async function hash(s: string) {
	return await bycrypt.hash(s, 10)
}

// COMPARE
// compares whether hash and string match
export async function compare(s: string, hash: string) {
	return await bycrypt.compare(s, hash)
}
