<script lang="ts">
	export let styles: string = '';
	import DarkmodeOn from './icons/darkmodeOn.svelte';
	import theme from '$lib/store/theme';
	import DarkmodeOff from './icons/darkmodeOff.svelte';
	$: isLightTheme = $theme === 'light';

	const handleToggleTheme = () => {
		isLightTheme ? theme.set('dark') : theme.set('light');
	};
</script>

<button class={`${styles}`} on:click={handleToggleTheme}>
	{#if isLightTheme}
		<DarkmodeOff />
	{:else}
		<DarkmodeOn />
	{/if}
</button>
