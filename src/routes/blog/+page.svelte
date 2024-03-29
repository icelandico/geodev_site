<script lang="ts">
	import { afterUpdate } from 'svelte';
	import type { GroupedPost, Post } from '$lib/server/blogPosts';
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import PostItem from '$components/PostItem.svelte';
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
	<div class="flex flex-wrap gap-2 w-full pt-4 mb-8">
		{#each data.tags as tag}
			<button
				on:click={() => handleClickTag(tag.name)}
				class={`p-1 border-2 border-secondaryBlack rounded cursor-pointer hover:border-primaryBlue dark:hover:border-primaryOrange ${
					activeTags.includes(tag.name)
						? 'text-primaryBlack dark:text-black border-primaryBlue dark:border-white bg-secondaryBlack dark:bg-white'
						: 'dark:text-white'
				}`}
			>
				{tag.name}
			</button>
		{/each}
	</div>
	{#each filteredPosts as yearGroup}
		<section class="mb-6 w-full">
			<div class="flex justify-between border-b-2 border-primaryBlue dark:border-primaryOrange">
				<h2 class="text-3xl dark:text-white">{yearGroup.year}</h2>
				<p class="text-sm dark:text-white">
					{yearGroup.posts.length}
					{`${yearGroup.posts.length === 1 ? 'post' : 'posts'}`}
				</p>
			</div>
			<div class="flex flex-col mt-4 gap-2">
				{#each yearGroup.posts as post}
					<PostItem {post} />
				{/each}
			</div>
		</section>
	{/each}
</Wrapper>
