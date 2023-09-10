import LocalStorageWritable from './localStorageWritable'
import type { Document, Tab } from '$types'

export default LocalStorageWritable<Document[]>('documents', [newDocument()], [newDocument()])

export function newDocument(): Document {
	return { name: 'untitled', tabs: [newTab()] }
}

export function newTab(): Tab {
	return { name: '', content: '' }
}
