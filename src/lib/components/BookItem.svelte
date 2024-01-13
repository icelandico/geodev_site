<script lang="ts">
  import Rating from '$components/Rating.svelte';
  export let title: string = '';
  export let date: string = '';
  export let author: string = '';
  export let rating: string = '';

  console.log('rating', rating)
</script>

<div class="flex my-4">
  <div class="basis-10/12">
    <h3 class="text-3xl text-primaryBlack text-bold italic">{title}</h3>
    <h2 class="text-2xl text-primaryBlack text-bold my-4">{author}</h2>
    <h2 class="text-2xl text-primaryBlack">{date}</h2>
  </div>
  <Rating rating={parseFloat(rating)} style="grow"/>
</div>
