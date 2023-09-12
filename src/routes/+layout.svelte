<script lang="ts">
	import { version, dev } from '$app/environment'
	import AppInstaller from '$lib/AppInstaller.svelte'
	import '../app.postcss'
	import * as LocalStorage from '$lib/LocalStorage'
	import { onMount } from 'svelte'

	let changelog: HTMLDialogElement
	onMount(checkVersion)

	function checkVersion() {
		if (dev) return
		const lastVersion = LocalStorage.get('version')

		if (lastVersion !== version) {
			LocalStorage.set('version', version)
			console.debug('App updated to version', version)
			changelog.showModal()
		}
	}
</script>

<AppInstaller />

<dialog bind:this={changelog}>
	<div class="w-full p-4 flex flex-col gap-2">
		<p>
			Svotepad has been updated! I'd like to do a changelog here but I haven't figured out how lol.
		</p>

		<p class="text-center text-sm text-gray-500">Version: {version}</p>

		<button on:click={() => changelog.close()} class="self-end">OK</button>
	</div>
</dialog>

<main class="flex flex-col h-[100dvh]">
	<a href="/" class=" p-2 gap-3 flex items-center w-min">
		<img src="/favicon.png" alt="Svotepad" class="h-8 rounded-full" />
		<h1 class="inline-block">Svotepad</h1>
	</a>

	<slot />
</main>
