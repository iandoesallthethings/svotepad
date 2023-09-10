<script lang="ts">
	import TipTap from '$lib/TipTap.svelte'
	import LocalStorageWritable from '$lib/localStorageWritable'

	let currentTab = 0

	const tabs = LocalStorageWritable<string[]>('tabs', [''], [''])

	function selectTab(index: number) {
		currentTab = index
	}

	function newTab() {
		$tabs.push('')
		currentTab = $tabs.length - 1
	}
</script>

<main class="flex flex-col p-4 gap-2">
	<h1>Svotepad</h1>

	{#key currentTab}
		<TipTap bind:content={$tabs[currentTab]} />
	{/key}

	<div class="flex gap-2">
		{#each $tabs as _, index}
			<button class:bg-blue-300={index === currentTab} on:click={() => selectTab(index)}>
				Tab {index + 1}
			</button>
		{/each}

		<button on:click={newTab}>+</button>
	</div>
</main>
