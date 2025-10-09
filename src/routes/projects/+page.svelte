<script>
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import ProjectCard from '$components/ProjectCard.svelte';

	export let data;
</script>

<TitleBar title="Projects" />

<Wrapper contentStyle="lg:w-7/12">
	<div class="flex md:flex-row justify-between w-full mt-8">
		<div class="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
			{#each data.projects as project}
				<a href={project.selfUrl ? project.selfUrl : `/projects/${project.slug}`}>
					<ProjectCard data={project} type={project.type} />
				</a>
			{/each}
		</div>
	</div>
</Wrapper>
