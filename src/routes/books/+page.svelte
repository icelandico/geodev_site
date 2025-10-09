<script lang="ts">
	import BookItem from '$components/BookItem.svelte';
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import { formatDate } from '$utils/formatDate';
	export let data;
</script>

<TitleBar title="Reading" />
<Wrapper>
	<div class="flex flex-col justify-center pt-4 overflow-auto">
		<div>
			<div class="flex items-center gap-8 mb-8 overflow-auto">
				{#each data.booksStats as stat}
					<div class="flex flex-col items-center gap-1/2 md:gap">
						<div class="w-4 h-4 bg-primaryBlue dark:bg-primaryOrange rounded-full mb-1" />
						<span class="font-bold dark:text-white">{stat.year}</span>
						<span class="whitespace-nowrap dark:text-white">Pages: {stat.pages}</span>
						<span class="dark:text-white">Books: {stat.books}</span>
					</div>
				{/each}
			</div>
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
