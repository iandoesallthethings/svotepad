<script lang="ts">
	import TipTap from '$lib/TipTap.svelte'
	import documents, { newTab } from '$lib/Documents'
	import { page } from '$app/stores'

	$: currentDocument = parseInt($page.params.index)
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

	function renameTab(index: number) {
		const newName = prompt('Rename tab', $documents[currentDocument].tabs[index].name)
		if (newName) $documents[currentDocument].tabs[index].name = newName
	}

	function getDialog(id: string) {
		return document.getElementById(id) as HTMLDialogElement
	}

	function openDialog(index: number) {
		const dialog = getDialog(`more-${index}`)
		dialog.show()
	}

	function closeDialog(index: number) {
		const dialog = getDialog(`more-${index}`)
		dialog.close()
	}
</script>

{#key [currentDocument, currentTab]}
	<TipTap bind:content={$documents[currentDocument].tabs[currentTab].content} />
{/key}

<div class="flex">
	{#each $documents[currentDocument].tabs as _, index}
		<button
			class="whitespace-nowrap group flex relative gap-2"
			class:active={index === currentTab}
			on:click={() => selectTab(index)}
		>
			{#if $documents[currentDocument].tabs[index].name}
				{$documents[currentDocument].tabs[index].name}
			{:else}
				Tab {index + 1}
			{/if}

			{#if index === currentTab}
				<button on:click={() => openDialog(index)} class="p-0">⏷</button>
			{/if}

			<dialog id="more-{index}">
				<button class="p-0" on:click={() => renameTab(index)}>✏️</button>

				{#if $documents[currentDocument].tabs.length > 1}
					<button class="p-0" on:click={() => removeTab(index)}> 🗑 </button>
				{/if}

				<button class="p-0" on:click={() => closeDialog(index)}>❌</button>
			</dialog>
		</button>
	{/each}

	<button on:click={createTab}>+</button>
</div>
