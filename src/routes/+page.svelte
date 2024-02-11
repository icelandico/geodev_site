<script>
	import PostItem from '$components/PostItem.svelte';
import Globe from '$components/icons/globe.svelte';
	export let data;
</script>

<div class="flex flex-col items-center w-100 mt-12">
	<div class="flex items-center">
		<h1 class="text-primaryBlue dark:text-white text-5xl">GEO</h1>
		<div class="mx-4">
			<Globe width={120} stroke={'#2563EB'} />
		</div>
		<h1 class="text-primaryBlue dark:text-white text-5xl">DEV</h1>
	</div>
	<div class="mt-4">
		<p class="text-primaryBlue dark:text-white">programming & cartography</p>
	</div>
	<div class="mt-16">
		<h2 class="text-primaryBlack dark:text-white text-4xl">Recent posts</h2>
    <div class="mt-8">
      {#each data.posts as post}
        <PostItem post={post} withYear />
      {/each}
    </div>
	</div>
</div>
