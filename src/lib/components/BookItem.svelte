<script lang="ts">
	import Rating from '$components/Rating.svelte';
	export let title: string = '';
	export let date: string = '';
	export let author: string = '';
	export let rating: string = '';

	$: isHovered = false;
</script>

<div
	role="button"
	tabindex="0"
	class="flex mb-12 cursor-pointer group"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
>
	<div class="basis-10/12">
		<h3 class="text-3xl text-primaryBlack font-bold italic group-hover:text-primaryBlue">
			{title}
		</h3>
		<h2 class="text-2xl text-primaryBlack font-bold my-4 group-hover:text-primaryBlue">{author}</h2>
		<h2 class="text-2xl text-primaryBlack group-hover:text-primaryBlue">{date}</h2>
	</div>
	<Rating {rating} style="grow justify-end" {isHovered} />
</div>
