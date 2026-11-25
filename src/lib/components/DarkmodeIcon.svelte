<script lang="ts">
	export let styles: string = '';
	import DarkmodeOn from './icons/darkmodeOn.svelte';
	import theme from '$lib/store/theme';
	import DarkmodeOff from './icons/darkmodeOff.svelte';
	$: isLightTheme = $theme === 'light';

	function utterancesTheme() {
		if (document.querySelector('.utterances-frame')) {
			const theme = document.documentElement.className.includes('dark') ? 'gruvbox-dark' : 'boxy-light'
			const message = {
				type: 'set-theme',
				theme: theme
			};
			const iframe = document.querySelector('.utterances-frame');
			iframe.contentWindow.postMessage(message, 'https://utteranc.es');
		}
	}

	const handleToggleTheme = () => {
		isLightTheme ? theme.set('dark') : theme.set('light');
		utterancesTheme();
	};
</script>

<button
	class={`${styles}`}
	on:click={handleToggleTheme}
	name="theme change"
	aria-label="theme change"
>
	{#if isLightTheme}
		<DarkmodeOff />
	{:else}
		<DarkmodeOn style="dark:fill-primaryBlack md:dark:fill-white" />
	{/if}
</button>
