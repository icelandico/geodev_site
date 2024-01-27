<script lang="ts">
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { formatDate } from '$utils/formatDate.js';
	import type { GroupedPost, Post } from '$lib/server/blogPosts';
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
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

	function filterByTags(posts: GroupedPost[], tagsToFilter: string[]) {
		return posts
			.map((yearlyPosts) => {
				const filteredPosts = yearlyPosts.posts.filter((post: Post) =>
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

<TitleBar title="Writing" />
<Wrapper contentStyle="flex-col items-center">
	<div class="flex flex-wrap gap-2 w-full mb-8">
		{#each data.tags as tag}
			<button
				on:click={() => handleClickTag(tag.name)}
				class={`p-1 border-2 border-secondaryBlue rounded cursor-pointer hover:border-primaryBlue ${
					activeTags.includes(tag.name) ? 'border-primaryBlue bg-secondaryBlue text-white' : ''
				}`}
			>
				{tag.name}
			</button>
		{/each}
	</div>
	{#each filteredPosts as yearGroup}
		<section class="mb-6 w-full">
			<div class="flex justify-between border-b-2 border-secondaryBlue">
				<h2 class="text-3xl">{yearGroup.year}</h2>
				<p class="text-sm">
					{yearGroup.posts.length}
					{`${yearGroup.posts.length === 1 ? 'post' : 'posts'}`}
				</p>
			</div>
			<div class="flex flex-col mt-4 gap-2">
				{#each yearGroup.posts as post}
					<div
						class="flex gap-4 sjustify-between items-center hover:outline-1 hover:outline-secondaryBlue hover:outline-dashed py-3"
					>
						<a class="text-xl font-semibold hover:text-primaryBlue" href={`blog/${post.slug}`}>
							{post.title}
						</a>
						<time class="text-sm text-right basis-3/12 ml-auto italic">{formatDate(post.date, false)}</time
						>
					</div>
				{/each}
			</div>
		</section>
	{/each}
</Wrapper>