<script lang="ts">
	import documents, { newDocument } from '$lib/Documents'

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

{#each $documents as document, index}
	<a role="button" href={`/${index}`} class="group relative flex items-center justify-center">
		{document.name}

		<div class="absolute right-0 hidden group-hover:block">
			<button on:click|stopPropagation|preventDefault={() => renameDocument(index)}>✏️</button>
			<button on:click|stopPropagation|preventDefault={() => removeDocument(index)}>🗑️</button>
		</div>
	</a>
{/each}

<button on:click={createDocument}>+</button>
