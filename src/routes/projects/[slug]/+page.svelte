<script>
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import { getMonthWithYear } from '$utils/formatDate';

	export let data;
</script>

<TitleBar title={data.meta.title} />

<Wrapper contentStyle="md:w-4/6">
	<div class="gap-8 w-full mt-4">
		<p class="text-white italic">Published: {getMonthWithYear(data.created)}</p>
		<article>
			<div class="dynamic-content">
				<svelte:component this={data.content} />
			</div>
		</article>
		<div class="flex flex-col mb-auto">
			<a href={data.meta.image} target="_blank" class="block mb-4 h-3/6">
				<img
					src={data.meta.image}
					alt="project"
					class="hover:grayscale-0 grayscale mx-auto md:w-4/6 shadow-xl"
				/>
			</a>
			<span class="text-sm italic dark:text-white">Click to open in full size</span>
			<div class="mt-6 flex gap-6">
				{#if data.meta.url}
					<a
						class="text-primaryBlue hover:bg-primaryBlue dark:text-primaryOrange dark:hover:text-white hover:text-white inline-block underline hover:decoration-white hover:decoration-2 dark:hover:bg-primaryOrange"
						target="_blank"
						href={data.meta.url}>Project</a
					>
				{/if}
				{#if data.meta.repoUrl}
					<a
						class="text-primaryBlue hover:bg-primaryBlue dark:text-primaryOrange dark:hover:text-white hover:text-white inline-block underline hover:decoration-white hover:decoration-2 dark:hover:bg-primaryOrange"
						target="_blank"
						href={data.meta.repoUrl}>Repository</a
					>
				{/if}
			</div>
		</div>
	</div>
</Wrapper>
