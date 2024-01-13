<script lang="ts">
	import BookItem from '$components/BookItem.svelte';
	import { formatDate } from '$utils/formatDate';
	export let data;
</script>

<div class="flex items-center justify-center mt-12 w-5/6 bg-primaryBlue h-16">
	<h1 class="text-white">READING</h1>
</div>
<div class="flex justify-center">
	<div class="w-3/6 pt-8">
		{#each data.books as book}
			<BookItem
				title={book.title}
				author={book.author}
				date={formatDate(book.date)}
				rating={book.rating}
			/>
		{/each}
	</div>
</div>
