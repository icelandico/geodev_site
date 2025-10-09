<script lang="ts">
	import Code from '$components/icons/code.svelte';
	import Globe from '$components/icons/globe.svelte';
	import type { Project } from '$lib/server/projects';
	import { lazyLoad } from '$utils/lazyLoad';
	export let data: Project;
	export let type: 'map' | 'code';
	export let containerClass = '';
</script>

<div
	class={`h-64 group relative flex justify-center items-center cursor-pointer ${containerClass}`}
>
	<img
		src={data.image}
		alt="map"
		class="h-full w-full absolute object-cover grayscale opacity-60 dark:opacity-30 group-hover:opacity-5 transition duration-500"
		use:lazyLoad={data.image}
	/>
	<div class="text-center dark:text-white p-4 opacity-0 group-hover:opacity-100 duration-500">
		<h2 class="font-semibold">
			{data.title}
		</h2>
	</div>
	{#if type === 'map'}
		<div
			class="absolute bottom-2 left-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-full h-6 w-6 flex items-center justify-center"
		>
			<Globe width={20} style={'stroke-black'} />
		</div>
	{:else if type === 'code'}
		<div
			class="absolute bottom-2 left-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-full h-6 w-6 flex items-center justify-center"
		>
			<Code width={16} />
		</div>
	{/if}
</div>
