<script lang="ts">
	import Goodreads from '$components/icons/goodreads.svelte';
	import Rating from '$components/Rating.svelte';
	import { formatDate } from '$utils/formatDate';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full md:w-3/6 max-md:px-4 pt-4">
	<article>
		<div class="mb-12">
			<h1 class="mt-3 mb-2 text-3xl dark:text-white">{data.meta.title}</h1>
			<h2 class="mt-3 mb-2 text-2xl dark:text-white">by: {data.meta.author}</h2>
			<div class="flex gap-6">
				<h3 class="my-1 text-1xl dark:text-white">{formatDate(data.meta.date)}</h3>
				<a href={data.meta.link} class="flex">
					<Goodreads />
				</a>
			</div>
			<Rating rating={data.meta.rating} style="mt-4" />
		</div>

		<div class="dynamic-content">
			<svelte:component this={data.content} />
		</div>
	</article>
</div>
