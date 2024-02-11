<script>
	import { formatDate } from '$utils/formatDate';

	export let data;
</script>

<div class="w-full m-auto md:w-3/6 max-md:px-4 pt-4">
	<h1 class="mt-3 mb-2 text-3xl md:text-5xl dark:text-white">{data.meta.title}</h1>
	<div class="my-4 flex justify-between items-center dark:text-white">
		<p>{formatDate(data.meta.date)}</p>
		<div class="flex gap-3">
			{#each data.meta.tag as tag}
				<div class="p-1 border-2 border-secondaryBlack dark:border-white">{tag}</div>
			{/each}
		</div>
	</div>
	<article class="pt-8 border-t-2 dark:border-t-primaryOrange border-t-primaryBlue">
		<div class="dynamic-content">
			<svelte:component this={data.content} />
		</div>
	</article>
</div>
