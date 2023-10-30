<script lang="ts">
	import { onMount } from 'svelte'
	import type { Editor } from '@tiptap/core'
	import lastActiveNodes from '$lib/tiptapHelpers'
	import Icon from 'svelte-awesome'
	import { faList, faListNumeric, faIndent, faOutdent } from '@fortawesome/free-solid-svg-icons'

	export let editor: Editor

	let lastUpdated = new Date()

	onMount(() => {
		editor.on('selectionUpdate', () => (lastUpdated = new Date()))
		return () => editor.off('selectionUpdate')
	})
</script>

{#key lastUpdated}
	<div class="flex">
		<button
			name="h1"
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class:active={editor.isActive('heading', { level: 1 })}
		>
			H1
		</button>
		<button
			name="h2"
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			H2
		</button>
		<button
			name="bold"
			on:click={() => editor.chain().focus().toggleBold().run()}
			class:active={editor.isActive('bold')}
		>
			B
		</button>

		<button
			name="italic"
			on:click={() => editor.chain().focus().toggleItalic().run()}
			class:active={editor.isActive('italic')}
		>
			<em>I</em>
		</button>

		<button
			name="toggleNumberList"
			on:click={() => editor.chain().focus().toggleOrderedList().run()}
			class:active={lastActiveNodes(editor, [{ type: 'orderedList' }]).length > 0}
		>
			<Icon data={faListNumeric} />
		</button>
		<button
			name="toggleBulletList"
			on:click={() => editor.chain().focus().toggleBulletList().run()}
			class:active={lastActiveNodes(editor, [{ type: 'bulletList' }]).length > 0}
		>
			<Icon data={faList} />
		</button>
		<button
			on:click={() => editor.chain().focus().liftListItem('listItem').run()}
			disabled={!editor.can().liftListItem('listItem')}
		>
			<Icon data={faOutdent} />
		</button>
		<button
			on:click={() => editor.chain().focus().sinkListItem('listItem').run()}
			disabled={!editor.can().sinkListItem('listItem')}
		>
			<Icon data={faIndent} />
		</button>
	</div>
{/key}
