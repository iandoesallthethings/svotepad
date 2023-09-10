<script lang="ts">
	import '../app.postcss'
	import { onMount } from 'svelte'
	import documents from '$lib/Documents'

	let deferredInstallEvent: Event | undefined

	onMount(() => {
		console.debug('adding event listener')
		window.addEventListener('beforeinstallprompt', (event) => {
			console.debug('beforeinstallprompt', event)
			event.preventDefault()
			deferredInstallEvent = event
		})
	})

	$: console.debug(deferredInstallEvent)

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
