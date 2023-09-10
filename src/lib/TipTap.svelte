<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { Editor } from '@tiptap/core'
	import StarterKit from '@tiptap/starter-kit'

	export let content: string = ''

	let element: HTMLElement
	let editor: Editor

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content,
			onTransaction: () => {
				editor = editor
				content = editor.getHTML()
			}
		})
	})

	onDestroy(() => {
		if (editor) editor.destroy()
	})
</script>

{#if editor}
	<div>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class:active={editor.isActive('heading', { level: 1 })}
		>
			H1
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			H2
		</button>
		<button
			on:click={() => editor.chain().focus().setParagraph().run()}
			class:active={editor.isActive('paragraph')}
		>
			P
		</button>
	</div>
{/if}

<div id="editor" bind:this={element} />

<style>
	:global(.tiptap) {
		@apply border border-black h-80 p-2;
	}

	button.active {
		@apply bg-blue-300;
	}
</style>
