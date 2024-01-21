<script>
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import Map from '$components/icons/map.svelte';
	import Code from '$components/icons/code.svelte';
	export let data;
	console.log('Data', data);
</script>

<TitleBar title="Projects" />

<Wrapper>
	<div class="flex justify-between w-full gap-6">
		<div class="flex flex-1 flex-col">
			<div class="my-4 flex justify-center">
				<svelte:component this={Map} />
			</div>

			{#each data.mapProjects as project}
				<div class="h-64 mb-6">
					<div
						style={`--image-url: url(${project.image})`}
						class="p-4 h-full border border-secondaryBlack cursor-pointer"
					>
						<div class="flex justify-between">
							<h2 class="font-semibold">
								{project.title}
							</h2>
						</div>
						<p class="mt-4">{project.description}</p>
					</div>
				</div>
			{/each}

		</div>

		<div class="flex flex-1 flex-col">
			<div class="my-4 flex justify-center">
				<svelte:component this={Code} />
			</div>
			{#each data.programmingProjects as project}
				<div class="h-64 mb-6">
					<div
						style={`--image-url: url(${project.image})`}
						class="p-4 h-full border border-secondaryBlack cursor-pointer"
					>
						<div class="flex justify-between">
							<h2 class="font-semibold">
								{project.title}
							</h2>
						</div>
						<p class="mt-4">{project.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Wrapper>
