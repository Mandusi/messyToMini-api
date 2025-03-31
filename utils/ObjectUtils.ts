import lodash from 'lodash'

// OBJECT DEEP EQUAL
// check if two objects are equal
export function deepEqual(o1: any, o2: any) {
	return lodash.isEqual(o1, o2)
}

// RANDOM ITEM
// returns random item from the given array
export function randomItem(array: any) {
	return lodash.sample(array)
}
