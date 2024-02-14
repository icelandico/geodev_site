<script lang="ts">
	import BookItem from '$components/BookItem.svelte';
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import { formatDate } from '$utils/formatDate';
	export let data;
	const doubledData = data.booksStats.concat(data.booksStats);
</script>

<TitleBar title="Reading" />
<Wrapper>
	<div class="flex flex-col justify-center pt-4">
		<div class="flex items-center gap-8 mb-8">
			{#each data.booksStats as stat}
				<div class="flex flex-col items-center gap-1/2 md:gap-1">
					<div class="w-4 h-4 bg-primaryBlue dark:bg-primaryOrange rounded-full mb-1" />
					<p class="font-bold dark:text-white">{stat.year}</p>
					<p class="whitespace-nowrap dark:text-white">Pages: {stat.pages}</p>
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
</Wrapper>
