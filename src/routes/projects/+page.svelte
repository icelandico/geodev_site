<script>
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	export let data;
	console.log('Data', data);
</script>

<TitleBar title="Projects" />

<Wrapper>
	<div class="flex justify-between w-full">
		<div>
			<h1>Cartography</h1>
			<div class="flex flex-col">
				{#each data.mapProjects as project}
					<div>{project.title}</div>
				{/each}
			</div>
		</div>
		<div>
			<h1>Other</h1>
			<div class="flex flex-col">
        {#each data.programmingProjects as project}
        <div>{project.title}</div>
      {/each}
      </div>
		</div>
	</div>
</Wrapper>
