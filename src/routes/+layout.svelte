<script lang="ts">
	import AppInstaller from '$lib/AppInstaller.svelte'
	import '../app.postcss'
</script>

<AppInstaller />

<main class="flex flex-col h-[100dvh]">
	<slot />
</main>
