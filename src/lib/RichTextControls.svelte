<script lang="ts">
	import type { Editor } from '@tiptap/core'

	export let editor: Editor
</script>

{#if editor}
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
			name="toggleBulletList"
			on:click={() => editor.chain().focus().toggleBulletList().run()}
			class:active={editor.isActive('bulletList')}
		>
			toggle list
		</button>
		<button
			on:click={() => editor.chain().focus().splitListItem('listItem').run()}
			disabled={!editor.can().splitListItem('listItem')}
		>
			splitListItem
		</button>
		<button
			on:click={() => editor.chain().focus().sinkListItem('listItem').run()}
			disabled={!editor.can().sinkListItem('listItem')}
		>
			sinkListItem
		</button>
		<button
			on:click={() => editor.chain().focus().liftListItem('listItem').run()}
			disabled={!editor.can().liftListItem('listItem')}
		>
			liftListItem
		</button>
	</div>
{/if}
