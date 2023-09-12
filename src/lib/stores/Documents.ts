import LocalStorageWritable from './localStorageWritable'
import type { Document, Tab } from '$types'

export default LocalStorageWritable<Document[]>('documents', [], [])

export function newDocument(name = 'untitled'): Document {
	return { name, tabs: [newTab()] }
}

export function newTab(): Tab {
	return { name: '', content: '' }
}
