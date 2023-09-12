<script lang="ts">
	import { onMount } from 'svelte'
	import { version, dev } from '$app/environment'
	import * as LocalStorage from '$lib/LocalStorage'

	onMount(checkVersion)

	let changelog: HTMLDialogElement
	let deferredInstallEvent: BeforeInstallPromptEvent | undefined

	function checkVersion() {
		if (dev) return
		const lastVersion = LocalStorage.get('version')

		if (lastVersion !== version) {
			LocalStorage.set('version', version)
			console.debug('App updated to version', version)
			changelog.showModal()
		}
	}

	function captureInstallPromptEvent(event: Event) {
		event.preventDefault()
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

<dialog bind:this={changelog}>
	<div class="w-full p-4 flex flex-col gap-2">
		<p>
			Svotepad has been updated! I'd like to do a changelog here but I haven't figured out how lol.
		</p>

		<p class="text-center text-sm text-gray-500">Version: {version}</p>

		<button on:click={() => changelog.close()} class="self-end">OK</button>
	</div>
</dialog>
