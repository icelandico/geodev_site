<script lang="ts">
  import BookItem from '$components/BookItem.svelte'
  import { formatDate } from '$utils/formatDate';
  export let data;

</script>
<div class="flex items-center justify-center mt-12 mr-24 bg-primaryBlue h-16">
  <h1 class="text-white">READING</h1>
</div>
<div class="mr-24 pl-8">
  <ul class="links">
    {#each data.books as book}
      <li>
        <BookItem title={book.title} author={book.author} date={formatDate(book.date)} rating={book.rating} />
      </li>
    {/each}
</ul>
</div>