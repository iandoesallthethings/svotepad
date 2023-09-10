import type { Writable } from 'svelte/store'

export { Writable }

export interface LocalStorageWritable<Value> extends Writable<Value> {
	reset: () => void
	remove: () => void
}
