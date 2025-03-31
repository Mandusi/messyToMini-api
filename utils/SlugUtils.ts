import { adjectives, nouns } from '../data/words.json'
import { randomItem } from './ObjectUtils'

export async function randomWord(letters: number) {
	const response = await fetch(
		`https://random-word-api.herokuapp.com/word?length=${letters}`
	)
	const data = response.json()

	return data
}

// RANDOM PHRASE
// generates a random "adjective + noun" phrase  e.g "crazy-woman"
export function randomPhrese() {
	const adj = randomItem(adjectives)
	const noun = randomItem(nouns)
	return `${adj}-${noun}`
}
