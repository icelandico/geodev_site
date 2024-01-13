<script lang="ts">
  export let rating: number = 0;
  export let style: string = '';

  const hasHalf = rating % 1 !== 0;
  const fullRating = Math.floor(rating);
  const ratingArray = [...new Array(fullRating)].map((value, index) => index + 1);
</script>
<div class={`flex gap-3 ${style} items-center`}>
  {#each ratingArray as rate}
    <span class="w-6 h-6 rounded-full bg-primaryBlack" />
  {/each}
  {#if hasHalf}
  <div class="w-6 h-6 flex">
    <span class="w-3 h-6 rounded-tl-full rounded-bl-full bg-primaryBlack" />
    <span class="w-3 h-6 rounded-tr-full rounded-br-full bg-teal-800" />
  </div>
  
    <!-- <div class="relative h-12 w-12 border-1">
      <div class="overflow-hidden absolute inset-0 rounded-full bg-teal-800 ">
        <div class="absolute top-0 left-0 h-full w-1/2"></div>
        <div class="absolute top-0 left-0 h-full w-1/2 bg-orange-700"></div>
      </div>
    </div> -->
  {/if}
</div>

<!-- .rating-dot {
  display: inline-block;
  margin: 0.2rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 0.1rem solid var(--color-black);
  background-color: var(--color-black);

  &--half {
    background: linear-gradient( -90deg, var(--color-gray), var(--color-gray) 50%, var(--color-white) 50%, var(--color-white) 50%, var(--color-black) 50% );
  }
} -->