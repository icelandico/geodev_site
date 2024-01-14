<script lang="ts">
	import { formatDate } from '$utils/formatDate.js';

	export let data;
	console.log('posts', data);
</script>

<div class="flex items-center justify-center mt-12 w-5/6 bg-primaryBlue h-16">
	<h1 class="text-white text-3xl">Writing</h1>
</div>
<div class="flex justify-center">
	<div class="flex flex-col items-center w-3/6 pt-8">
		{#each data.posts as yearGroup}
			<section class="mb-6 w-full">
				<h2 class="text-3xl border-b-2 border-secondaryBlue">{yearGroup.year}</h2>
				<div class="flex flex-col mt-4 gap-2">
					{#each yearGroup.posts as post}
						<div
							class="flex justify-between items-center hover:outline-1 hover:outline-dashed py-3"
						>
							<a
								class="text-xl basis-9/12 font-semibold hover:text-primaryBlue"
								href={`blog/${post.slug}`}
							>
								{post.title}
							</a>
							<p class="mt-2 italic">{formatDate(post.date)}</p>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>
