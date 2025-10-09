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
	class="flex flex-col md:flex-row mb-8 cursor-pointer group"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
>
	<div class="basis-10/12">
		<h2
			class="text-xl md:text-xl text-primaryBlack dark:text-white font-bold italic group-hover:text-primaryBlue group-hover:dark:text-primaryOrange"
		>
			{title}
		</h2>
		<h3
			class="text-md md:text-xl text-primaryBlack dark:text-white my-2 md:my-2 group-hover:text-primaryBlue group-hover:dark:text-primaryOrange"
		>
			{author}
		</h3>
		<p
			class="text-md md:text-md text-primaryBlack dark:text-white group-hover:text-primaryBlue group-hover:dark:text-primaryOrange"
		>
			{date}
		</p>
	</div>
	<Rating {rating} style="grow justify-start md:justify-end mt-2 md:mt-0" {isHovered} />
</div>
