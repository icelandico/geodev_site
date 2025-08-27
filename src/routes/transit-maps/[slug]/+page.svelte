<script lang="ts">
	import Wrapper from '$components/Wrapper.svelte';
	import { formatDate } from '$utils/formatDate';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Wrapper>
	<article>
		<div class="mb-12">
			<h1 class="mb-2 text-3xl dark:text-white">{data.title}</h1>
			<div class="flex gap-6">
				<h3 class="my-1 text-1xl dark:text-white">{formatDate(data.date)}</h3>
			</div>
		</div>
		<a href={data.img} target="_blank" class="block my-8">
			<img
				src={data.img}
				alt="project"
				class="grayscale hover:grayscale-0 mx-auto md:w-4/6 shadow-xl"
			/>
		</a>
		<div class="dynamic-content">
			<svelte:component this={data.content} />
		</div>
	</article>
</Wrapper>
