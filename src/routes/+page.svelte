<script lang="ts">
	import { browser } from '$app/environment'
	import documents, { newDocument } from '$lib/Documents'
	import Device from 'svelte-device-info'

	$: isTouchDevice = browser ? Device.isMobile : false

	function createDocument() {
		const name = prompt('Document name')
		if (name) $documents.push(newDocument(name))
		$documents = $documents
	}

	function renameDocument(index: number) {
		const newName = prompt('Rename document', $documents[index].name)
		if (newName) $documents[index].name = newName
	}

	function removeDocument(index: number) {
		$documents.splice(index, 1)
		$documents = $documents
	}
</script>

<h2 class="text-center font-bold">Documents</h2>

<hr class="my-4" />

{#if $documents.length === 0}
	<p class="text-center text-gray-500">No documents</p>
{/if}

{#each $documents as document, index}
	<a role="button" href={`/${index}`} class="group relative flex items-center justify-center h-12">
		{document.name}

		<div class:!block={isTouchDevice} class="absolute right-0 hidden group-hover:block">
			<button on:click|stopPropagation|preventDefault={() => renameDocument(index)}>✏️</button>
			<button on:click|stopPropagation|preventDefault={() => removeDocument(index)}>🗑️</button>
		</div>
	</a>
{/each}

<button class="h-12" on:click={createDocument}>+</button>
