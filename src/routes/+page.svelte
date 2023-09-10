<script lang="ts">
	import TipTap from '$lib/TipTap.svelte'
	import documents, { newDocument, newTab } from '$lib/Documents'

	let currentDocument = 0
	let currentTab = 0

	function selectTab(index: number) {
		currentTab = index
	}

	function createTab() {
		$documents[currentDocument].tabs.push(newTab())
		currentTab = $documents[currentDocument].tabs.length - 1
	}

	function removeTab(index: number) {
		$documents[currentDocument].tabs.splice(index, 1)

		if (index === currentTab) {
			currentTab = $documents[currentDocument].tabs.length - 1
		}
	}
	function renameDocument() {
		const newName = prompt('Rename document', $documents[currentDocument].name)
		if (newName) $documents[currentDocument].name = newName
	}

	function renameTab() {
		const newName = prompt('Rename tab', $documents[currentDocument].tabs[currentTab].name)
		if (newName) $documents[currentDocument].tabs[currentTab].name = newName
	}
</script>

<div class="text-gray-500 flex items-center">
	<h1 class="m-0 p-4">Svotepad</h1>

	<button on:click={renameDocument}>
		{$documents[currentDocument].name}
	</button>

	<button on:click={renameTab}>
		{$documents[currentDocument].tabs[currentTab].name || 'Tab ' + (currentTab + 1)}
	</button>
</div>

{#key currentTab}
	<TipTap bind:content={$documents[currentDocument].tabs[currentTab].content} />
{/key}

<div class="flex">
	{#each $documents[currentDocument].tabs as _, index}
		<button
			class="whitespace-nowrap group"
			class:active={index === currentTab}
			on:click={() => selectTab(index)}
		>
			{#if $documents[currentDocument].tabs[index].name}
				{$documents[currentDocument].tabs[index].name}
			{:else}
				Tab {index + 1}
			{/if}

			<!-- {#if $documents[currentDocument].tabs.length > 1}
				<button class="p-0 hidden group-hover:inline" on:click={() => removeTab(index)}> x </button>
			{/if} -->
		</button>
	{/each}

	<button on:click={createTab}>+</button>
</div>
