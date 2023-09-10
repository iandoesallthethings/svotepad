import { browser } from '$app/environment'

export function set(key: string, value: any) {
	if (!browser) return

	const stringified = JSON.stringify(value)
	window.sessionStorage.setItem(key, stringified)
}

export function get<Value>(key: string): Value | null {
	if (!browser) return null

	const stringified = window.sessionStorage.getItem(key)
	if (stringified == null) return null

	return JSON.parse(stringified)
}

export function remove(key: string) {
	window.sessionStorage.removeItem(key)
}
