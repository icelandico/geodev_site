<script lang="ts">
	import type { Project } from '$lib/server/projects';
	import { lazyLoad } from '$utils/lazyLoad';
	export let data: Project;
</script>

<div class="h-64 group relative mb-6 flex justify-center items-center cursor-pointer">
	<img
		src={data.image}
		alt="map"
		class="h-full w-full absolute object-cover grayscale opacity-30 group-hover:opacity-5 transition duration-500"
		use:lazyLoad={data.image}
	/>
	<div class="text-center dark:text-white p-4 opacity-0 group-hover:opacity-100 duration-500">
		<h2 class="font-semibold">
			{data.title}
		</h2>
		<p class="mt-2">{data.description}</p>
	</div>
</div>
