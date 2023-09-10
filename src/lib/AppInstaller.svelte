<script lang="ts">
	// import LocalStorage from '$lib/LocalStorage'

	let deferredInstallEvent: BeforeInstallPromptEvent | undefined

	function captureInstallPromptEvent(event: Event) {
		deferredInstallEvent = event as BeforeInstallPromptEvent
	}

	async function install() {
		if (!deferredInstallEvent) return

		deferredInstallEvent.prompt()
		let choice = await deferredInstallEvent.userChoice

		if (choice.outcome === 'accepted') {
			// ???
		} else {
			// LocalStorage.set('dismissed-install-prompt', true)
		}

		deferredInstallEvent = undefined
	}
</script>

<svelte:window on:beforeinstallprompt={captureInstallPromptEvent} />

{#if deferredInstallEvent}
	<button class="absolute top-4 right-4" on:click={install}>Install As App</button>
{/if}
