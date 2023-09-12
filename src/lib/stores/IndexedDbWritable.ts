/* eslint-disable @typescript-eslint/no-unused-vars */
import { KV } from './IndexedDb'

type Subscriber<T = unknown> = (currentValue: T) => void

/** Create a generic Svelte store persisted in IndexedDB */
export default function makeIndexedDBStore<T>(
	dbName: string,
	storeName: string,
	initialValue: T,
	crossTab: boolean
) {
	function makeStoreMaker(dbKey: string, initialValue: T, crossTab: boolean) {
		const lsKey = 'store-notify:' + dbKey
		let currentValue = initialValue
		const subscribers = new Set<Subscriber<T>>()
		const db = new KV(dbName, storeName)

		function getCurrentValue() {
			db.get(dbKey).then((v) => {
				currentValue = v || []
				subscribers.forEach((cb) => cb(currentValue))
			})
		}

		getCurrentValue()

		function storageChanged(event: StorageEvent) {
			if (event.storageArea === localStorage && event.key === lsKey) {
				getCurrentValue()
			}
		}
		if (crossTab) {
			window.addEventListener('storage', storageChanged, false)
		}

		function set(v: T) {
			currentValue = v
			subscribers.forEach((cb) => cb(currentValue))

			db.set(dbKey, v).then((_v) => {
				if (crossTab) {
					const n = +(localStorage.getItem(lsKey) || 0)

					localStorage.setItem(lsKey, `${n + 1}`)
				}
			})
		}

		function subscribe(subscriber: Subscriber<T>) {
			subscriber(currentValue)
			subscribers.add(subscriber)
			function unsubscribe() {
				subscribers.delete(subscriber)
			}
			return unsubscribe
		}

		return { set, subscribe }
	}

	return makeStoreMaker(storeName, initialValue, crossTab)
}
