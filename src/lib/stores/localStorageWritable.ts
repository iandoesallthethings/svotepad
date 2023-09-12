import type { Writable, LocalStorageWritable } from '$types'
import { writable, type Updater } from 'svelte/store'
import * as LocalStorage from '$lib/stores/LocalStorage'
import * as SessionStorage from '$lib/stores/SessionStorage'

export default function createLocalStorageWritable<Value>(
	key: string,
	valueIfLocalStorageIsNullish: Value,
	valueWhenRemoved: Value,
	lifeCycle: 'local' | 'session' = 'local'
): LocalStorageWritable<Value> {
	const Storage = lifeCycle === 'local' ? LocalStorage : SessionStorage

	const startingValueFromLocalStorage = Storage.get<Value>(key)

	let startingValue: Value
	if (startingValueFromLocalStorage == null) {
		Storage.set(key, valueIfLocalStorageIsNullish)
		startingValue = cloneIfCanBeStringified(valueIfLocalStorageIsNullish)
	} else {
		startingValue = startingValueFromLocalStorage
	}

	const store: Writable<Value> = writable(cloneIfCanBeStringified(startingValue))

	function set(newValue: Value) {
		Storage.set(key, cloneIfCanBeStringified(newValue))
		store.set(cloneIfCanBeStringified(newValue))
	}

	function update(updater: Updater<Value>) {
		store.update(($oldValue) => {
			const newValue = updater($oldValue)
			Storage.set(key, cloneIfCanBeStringified(newValue))
			return cloneIfCanBeStringified(newValue)
		})
	}

	function reset() {
		store.set(cloneIfCanBeStringified(valueIfLocalStorageIsNullish))
	}

	function remove() {
		store.set(valueWhenRemoved)
		Storage.remove(key)
	}

	return {
		subscribe: store.subscribe,
		set,
		update,
		reset,
		remove
	}
}

// A way to make a copy of any object that can be stringified and then re-parsed as JSON.
function cloneIfCanBeStringified<ObjectThatCanBeStringified>(
	obj: ObjectThatCanBeStringified
): ObjectThatCanBeStringified {
	return JSON.parse(JSON.stringify(obj))
}
