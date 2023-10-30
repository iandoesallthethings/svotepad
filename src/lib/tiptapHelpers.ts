import type { NodeType, Node } from 'prosemirror-model'
import { objectIncludes, getNodeType, Editor } from '@tiptap/core'

export interface LastActiveNodesItemOption {
	type: NodeType | string | null
	attributes?: Record<string, unknown>
	key?: string
}

export default function lastActiveNodes(
	editor: Editor,
	typesOrGroup: LastActiveNodesItemOption[] | string
): string[] {
	const state = editor.state
	const { from, to, empty: _empty } = state.selection
	let types: LastActiveNodesItemOption[]

	if (typeof typesOrGroup === 'string') {
		// types is a name of a node group
		types = Object.entries(state.schema.nodes)
			.filter(([_name, nodeType]) => (nodeType as any).groups.includes(typesOrGroup))
			.map(([_name, nodeType]) => {
				return {
					type: nodeType as NodeType
				}
			})
	} else {
		// types is a list of LastActiveNodeItemOption
		types = typesOrGroup
		for (const item of types) {
			item.type = item.type ? getNodeType(item.type, state.schema) : null
		}
	}

	let lastNode: Node | null = null
	let lastMatchedType: LastActiveNodesItemOption | null = null
	const matchedTypes: Set<LastActiveNodesItemOption> = new Set()
	const notFoundTypes = new Set(types)

	state.doc.nodesBetween(from, to, (node, pos, parent) => {
		if (notFoundTypes.size == 0) return false
		if (!node.isText) {
			const matchedType = types
				.filter((item) => {
					if (!item.type) {
						return true
					}
					if (typeof item.type === 'string') return false // Typeguard, shouldn't happen
					return node.type.name === item.type.name
				})
				.find((item) => {
					if (!item.attributes) return true
					return objectIncludes(node.attrs, item.attributes)
				})
			if (matchedType) {
				if (lastMatchedType && lastNode && lastNode !== parent) {
					notFoundTypes.delete(lastMatchedType)
					matchedTypes.add(lastMatchedType)
				}
				lastMatchedType = matchedType
			}
			lastNode = node
		}
	})

	if (lastMatchedType) {
		matchedTypes.add(lastMatchedType)
	}

	const matches = [...matchedTypes.values()].map((item) => {
		if (item.key) {
			return item.key
		} else if (typeof item.type === 'string') {
			return item.type
		} else if (item.type?.name) {
			return item.type.name
		} else {
			return ''
		}
	})
	console.debug('matches', matches)
	return matches
}
