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
						'border-y border-zinc-800/10 dark:border-zinc-300/40 h-full !max-w-full p-2 prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none'
				}
			}
		})

		return () => editor.destroy()
	})
</script>

{#if editor}
	<RichTextControls {editor} />
{/if}

<div id="editor" class="h-full" bind:this={element} />
