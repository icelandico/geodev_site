<script lang="ts">
	import GenreTag from '$components/GenreTag.svelte';
	import ExternalLink from '$components/icons/externalLink.svelte';
	import Rating from '$components/Rating.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import { formatDate } from '$utils/formatDate';
	import type { PageData } from './$types';
	export let data: PageData;
	const bookGenres = data.meta.genre;
</script>

<Wrapper>
	<article>
		<div class="mb-12">
			<h1 class="mb-2 text-3xl dark:text-white">{data.meta.title}</h1>
			<h2 class="mt-3 mb-2 text-2xl dark:text-white">by: {data.meta.author}</h2>
			<div class="flex gap-6 items-center">
				<h3 class="my-1 text-1xl dark:text-white">{formatDate(data.meta.date)}</h3>
				<a href={data.meta.link} class="flex" aria-label="external books library" target="_blank">
					<ExternalLink />
				</a>
				{#if data.meta.polishOnly}
					<p class="dark:text-white">Polish only</p>
				{/if}
			</div>
			<div class="flex space-between items-center gap-4 mt-4">
				<Rating rating={data.meta.rating} />
				{#if bookGenres}
					<div class="flex gap-2">
						{#each data.meta.genre as genre}
							<GenreTag tag={genre} />
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="dynamic-content">
			<svelte:component this={data.content} />
		</div>
	</article>
</Wrapper>
