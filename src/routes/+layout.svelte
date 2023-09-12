<script lang="ts">
	import AppInstaller from '$lib/AppInstaller.svelte'
	import '../app.postcss'
</script>

<AppInstaller />

<main class="flex flex-col h-[100dvh]">
	<a href="/" class=" p-2 gap-3 flex items-center w-min">
		<img src="/favicon.png" alt="Svotepad" class="h-8 rounded-full" />
		<h1 class="inline-block">Svotepad</h1>
	</a>

	<slot />
</main>
