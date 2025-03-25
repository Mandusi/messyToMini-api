import lodash from 'lodash'

// OBJECT DEEP EQUAL
// check if two objects are equal
export function deepEqual(o1: any, o2: any) {
	return lodash.isEqual(o1, o2)
}
