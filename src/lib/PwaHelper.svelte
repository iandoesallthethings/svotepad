<script lang="ts">
	import { onMount } from 'svelte'
	import { version, dev } from '$app/environment'
	import * as LocalStorage from '$lib/LocalStorage'

	onMount(checkVersion)

	let welcome: HTMLDialogElement
	let changelog: HTMLDialogElement
	let deferredInstallEvent: BeforeInstallPromptEvent | undefined

	function checkVersion() {
		// if (dev) return

		const lastVersion = LocalStorage.get('version')

		console.debug(lastVersion)
		if (lastVersion == null) {
			welcome.showModal()
		} else if (lastVersion !== version) {
			changelog.showModal()
		}

		LocalStorage.set('version', version)
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

<dialog bind:this={welcome}>
	<div class="w-full p-4 flex flex-col gap-2 max-w-lg">
		<h2 class="text-center">Welcome to Svotepad!</h2>

		<p>
			It's a scrappy little local text editor I made for me and my friends. It saves your docs in
			local browser storage, but I intend to make it multiplayer eventually.
		</p>

		<p>
			It also acts as a Progressive Web App (PWA), meaning you can install it on your phone's home
			screen and use it like a native app without the annoying browser frame. So that's kinda neat
			🤷‍♂️
		</p>

		<button on:click={() => welcome.close()} class="self-end">OK</button>
	</div>
</dialog>

<dialog bind:this={changelog}>
	<div class="w-full p-4 flex flex-col gap-2">
		<h2 class="text-center">Svotepad has been updated!</h2>

		<p>
			I'd like to do a changelog here but I'm lazy and haven't figured out how to do it
			automatically.
		</p>

		<p class="text-center text-sm text-gray-500">Version: {version}</p>

		<button on:click={() => changelog.close()} class="self-end">OK</button>
	</div>
</dialog>
