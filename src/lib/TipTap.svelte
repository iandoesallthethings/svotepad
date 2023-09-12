<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { Editor } from '@tiptap/core'
	import StarterKit from '@tiptap/starter-kit'
	import RichTextControls from './RichTextControls.svelte'

	export let content: string = ''

	let element: HTMLElement
	let editor: Editor

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content,
			onTransaction: () => (content = editor.getHTML())
		})

		return () => editor.destroy()
	})
</script>

<RichTextControls {editor} />

<div id="editor" class="h-full" bind:this={element} />
