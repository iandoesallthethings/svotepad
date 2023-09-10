import type { Writable } from 'svelte/store'

export { Writable }

export interface LocalStorageWritable<Value> extends Writable<Value> {
	reset: () => void
	remove: () => void
}

export interface Document {
	name: string
	tabs: Tab[]
}

export interface Tab {
	name: string
	content: string
}
