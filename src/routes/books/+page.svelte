<script lang="ts">
	import BookItem from '$components/BookItem.svelte';
	import TitleBar from '$components/TitleBar.svelte';
	import { formatDate } from '$utils/formatDate';
	export let data;
</script>

<TitleBar title="Reading" />
<div class="flex justify-center">
	<div class="w-3/6 pt-8 w-full md:w-3/6 max-md:px-4 pt-4">
		<div class="flex items-center gap-8 mb-8">
			{#each data.booksStats as stat}
				<div class="flex flex-col items-center gap-2">
					<div class="w-4 h-4 bg-primaryBlue rounded-full" />
					<p class="font-bold dark:text-white">{stat.year}</p>
					<p class="dark:text-white">Pages: {stat.pages}</p>
					<p class="dark:text-white">Books: {stat.books}</p>
				</div>
			{/each}
		</div>
		<div>
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
