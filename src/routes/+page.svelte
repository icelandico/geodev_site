<script>
	import PostItem from '$components/PostItem.svelte';
	import Globe from '$components/icons/globe.svelte';
	import BookItem from '$components/BookItem.svelte';
	import { formatDate } from '$utils/formatDate';
	export let data;
</script>

<div class="flex flex-col items-center w-100 md:mt-12 px-4">
	<div class="flex items-center">
		<h1 class="text-primaryBlue dark:text-white text-5xl">GEO</h1>
		<div class="mx-4">
			<Globe width={120} style="stroke-primaryBlue dark:stroke-white" />
		</div>
		<h1 class="text-primaryBlue dark:text-white text-5xl">DEV</h1>
	</div>
	<div class="mt-4">
		<p class="text-primaryBlue dark:text-white">programming & cartography</p>
	</div>
	<div class="mt-14 md:w-5/12">
		<h2 class="text-primaryBlack dark:text-white text-4xl">Recent posts</h2>
		<div class="mt-8">
			{#each data.posts as post}
				<PostItem {post} withYear />
			{/each}
		</div>
	</div>
	<div class="mt-8 w-full md:w-5/12">
		<h2 class="text-primaryBlack dark:text-white text-4xl">Reading</h2>
		<div class="mt-8">
			{#each data.books as book}
				<a href={`books/${book.slug}`} role="button">
					<BookItem
						title={book.title}
						author={book.author}
						date={formatDate(book.date)}
						rating={book.rating}
					/>
				</a>
			{/each}
		</div>
	</div>
</div>
