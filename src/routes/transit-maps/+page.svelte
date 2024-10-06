<script lang="ts">
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import { formatDate } from '$utils/formatDate';
	export let data;
</script>

<TitleBar title="Transit Maps" />
<Wrapper>
	<div class="flex flex-col justify-between pt-4 overflow-auto w-full">
		<div>
			{#each data.maps as map}
				<a
					href={`transit-maps/${map.slug}`}
					role="button"
					class="flex items-center group gap-4 dark:text-white py-3 cursor-pointer gap-4 text-xl font-semibold hover:dark:text-primaryOrange hover:text-primaryBlue"
				>
					<h2 class="text-xl md:text-xl font-bold">
						{map.title}
					</h2>
					<time class="text-sm text-right basis-3/12 ml-auto italic"
						>{formatDate(map.created, true)}</time
					>
				</a>
			{/each}
		</div>
	</div>
</Wrapper>
