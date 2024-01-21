<script>
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import Code from '$components/icons/code.svelte';
	import ProjectCard from '$components/ProjectCard.svelte';
	import Globe from '$components/icons/globe.svelte';

	export let data;
</script>

<TitleBar title="Projects" />

<Wrapper>
	<div class="flex flex-col md:flex-row justify-between w-full gap-6">
		<div class="flex flex-1 flex-col">
			<div class="my-4 flex justify-center">
				<Globe width={44} />
			</div>
			{#each data.mapProjects as project}
				<a href={`/projects/${project.slug}`}>
					<ProjectCard data={project} />
				</a>
			{/each}
		</div>

		<div class="flex flex-1 flex-col">
			<div class="my-4 flex justify-center">
				<Code width={44} height={44} />
			</div>
			{#each data.programmingProjects as project}
				<a href={`/projects/${project.slug}`}>
					<ProjectCard data={project} />
				</a>
			{/each}
		</div>
	</div>
</Wrapper>
