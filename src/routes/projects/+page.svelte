<script>
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import Map from '$components/icons/map.svelte';
	import Code from '$components/icons/code.svelte';
	import ProjectCard from '$components/ProjectCard.svelte';
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
				<ProjectCard data={project} />
			{/each}
		</div>

		<div class="flex flex-1 flex-col">
			<div class="my-4 flex justify-center">
				<svelte:component this={Code} />
			</div>
			{#each data.programmingProjects as project}
				<ProjectCard data={project} />
			{/each}
		</div>
	</div>
</Wrapper>
