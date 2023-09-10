<script lang="ts">
	import '../app.postcss'
	import { onMount } from 'svelte'
	import documents from '$lib/Documents'

	let deferredInstallEvent: Event | undefined

	onMount(() => {
		window.addEventListener('beforeinstallprompt', (event) => {
			event.preventDefault()
			deferredInstallEvent = event
		})
	})

	async function install() {
		deferredInstallEvent.prompt()
		let choice = await deferredInstallEvent.userChoice
		if (choice.outcome === 'accepted') {
			// User accepted to install the application
		} else {
			// User dismissed the prompt
		}
		deferredInstallEvent = undefined
	}
</script>

<main class="flex flex-col h-[100dvh]">
	{#if deferredInstallEvent}
		<button on:click={install}>Install</button>
	{/if}

	<slot />
</main>
