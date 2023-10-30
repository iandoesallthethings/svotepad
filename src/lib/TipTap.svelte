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
			onTransaction: () => (content = editor.getHTML()),
			editorProps: {
				attributes: {
					class:
						'border h-full p-2 prose dark:prose-invert dark:bg-black prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none'
				}
			}
		})

		return () => editor.destroy()
	})
</script>

<RichTextControls {editor} />

<div id="editor" class="h-full" bind:this={element} />
