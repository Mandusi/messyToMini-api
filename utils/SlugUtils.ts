export default async function (letters: number) {
	const response = await fetch(
		`https://random-word-api.herokuapp.com/word?length=${letters}`
	)
	const data = response.json()

	return data
}
