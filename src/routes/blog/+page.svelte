<script lang="ts">
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { formatDate } from '$utils/formatDate.js';
	export let data;
	let activeTags: string[] = [];
	$: filteredPosts = filterByTags(data.posts, activeTags);

	const handleClickTag = (tag: string) => {
		if (isTagActive(tag)) {
			activeTags = activeTags.filter((activeTag) => activeTag !== tag);
		} else {
			activeTags = [...activeTags, tag];
		}
	};

	afterUpdate(() => {
		const filteredPosts = filterByTags(data.posts, activeTags);
	});

	const isTagActive = (tag: string) => activeTags.includes(tag);

	function filterByTags(posts: any[], tagsToFilter: string[]) {
		return posts
			.map((yearlyPosts) => {
				const filteredPosts = yearlyPosts.posts.filter((post) =>
					tagsToFilter.every((tag) => post.tag.includes(tag))
				);

				return {
					year: yearlyPosts.year,
					posts: filteredPosts
				};
			})
			.filter((yearlyPosts) => yearlyPosts.posts.length > 0);
	}
</script>

<div class="flex items-center justify-center mt-12 w-5/6 bg-primaryBlue h-16">
	<h1 class="text-white text-3xl">Writing</h1>
</div>

<div class="flex justify-center">
	<div class="flex flex-col items-center w-3/6 pt-8">
		<div class="flex flex-wrap gap-2 w-full mb-8">
			{#each data.tags as tag}
				<button
					on:click={() => handleClickTag(tag.name)}
					class={`p-1 border-2 border-secondaryBlue rounded cursor-pointer hover:border-primaryBlue ${
						activeTags.includes(tag.name) ? 'border-primaryBlue bg-secondaryBlue' : ''
					}`}
				>
					{tag.name}
				</button>
			{/each}
		</div>
		{#each filteredPosts as yearGroup}
			<section class="mb-6 w-full">
				<h2 class="text-3xl border-b-2 border-secondaryBlue">{yearGroup.year}</h2>
				<div class="flex flex-col mt-4 gap-2">
					{#each yearGroup.posts as post}
						<div
							class="flex gap-4 sjustify-between items-center hover:outline-1 hover:outline-secondaryBlue hover:outline-dashed py-3"
						>
							<a class="text-xl font-semibold hover:text-primaryBlue" href={`blog/${post.slug}`}>
								{post.title}
							</a>
							<time class="text-sm text-right basis-3/12 ml-auto italic"
								>{formatDate(post.date)}</time
							>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>
