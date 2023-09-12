<script lang="ts">
	import '../app.postcss'
	import { page } from '$app/stores'
	import documents from '$lib/stores/Documents'
	import PWA from '$lib/PwaHelper.svelte'
	import * as Urls from '$lib/Urls'

	function renameDocument(index: number) {
		const newName = prompt('Rename document', $documents[index].name)
		if (newName) $documents[index].name = newName
	}
</script>

<PWA />

<main class="flex flex-col h-[100dvh]">
	<div class="flex items-center">
		<a href="/" class=" p-2 gap-3 flex items-center">
			<img src="/favicon.png" alt="Svotepad" class="h-8 rounded-full" />

			{#if $page.route.id !== Urls.editorPage()}
				<h1 class="inline-block">Svotepad</h1>
			{/if}
		</a>

		{#if $page.route.id === Urls.editorPage()}
			<button on:click={() => renameDocument(parseInt($page.params.index))} class="text-xl group">
				{$documents[parseInt($page.params.index)].name}
				<span class="hidden group-hover:inline text-xs">✏️</span>
			</button>
		{/if}
	</div>

	<slot />
</main>
