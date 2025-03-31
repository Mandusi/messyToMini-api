import { createJSONFile, txtToJson } from '../utils/FsUtils'
import path from 'path'
async function test() {
	const nouns = await txtToJson(path.join(__dirname, '../data/nouns.txt'))
	const adjectives = await txtToJson(path.join(__dirname, '../data/adjectives.txt'))

	const shortAdjectives = adjectives.filter(word => word.length < 6)
	const shortNouns = nouns.filter(word => word.length < 6)

	const words = { adjectives: shortAdjectives, nouns: shortNouns }

	await createJSONFile(path.join(__dirname, '../data/words.json'), words)
}

test()
