import lodash from 'lodash'

// CHUNKS
// chunk array into smaller arrays
export function chunks<T>(arr: Array<T>, size: number) {
	return lodash.chunk(arr, size)
}

// SORT PRIMITIVE ARRAY
// sort primitive array
export function sort<T>(arr: Array<T>) {
	return lodash.sortBy(arr)
}

// SORT OBJECTS
// sort array of objects by key
export function sortObjects<T>(arr: Array<T>, key: string) {
	return lodash.sortBy(arr, key)
}

// UNIQUE PRIMITIVE ARRAY
// get unique values from primitive array
export function unique<T>(arr: Array<T>) {
	return lodash.uniq(arr)
}

// UNIQUE OBJECTS
// get unique objects from array of objects
export function uniqueObjects<T>(arr: Array<T>, key: string) {
	return lodash.uniqBy(arr, key)
}

// RANDOM ELEMENT
// get random element from array
export function random<T>(arr: Array<T>) {
	return lodash.sample(arr)
}

// NEST OBJECTS
// nest objects by key from array of objects
// the depth of nesting is arbitrary
/*export function nest<T>(arr: Array<T>, key: string) {
	const root = arr.find((i: any) => i[key] === null)
	function nestChildren(parent: any) {
		parent.children = arr.filter((i: any) => i[key] === parent.id)
		parent.children.forEach(nestChildren)
	}
	nestChildren(root)
	return root
}*/

export function nest<T extends Record<string, any>>(
	arr: Array<T>,
	key: string
): Array<T> {
	// parent olarak gelen key null veya undefined olanlar
	const roots = arr.filter(item => item[key] === null || item[key] === undefined)

	const idToNodeMap: any = new Map(arr.map(item => [item.id, { ...item, children: [] }]))

	arr.forEach((item: any) => {
		const parent = idToNodeMap.get(item[key])
		if (parent) {
			parent.children.push(idToNodeMap.get(item.id))
		}
	})

	return roots.map(root => idToNodeMap.get(root.id))
}

// GROUP OBJECTS
// group objects by key from array of objects
export function group<T>(arr: Array<T>, key: (i: T) => string) {
	return Object.fromEntries(
		Object.entries(lodash.groupBy(arr, key)).filter(([k, v]) => k !== 'undefined')
	)
}
