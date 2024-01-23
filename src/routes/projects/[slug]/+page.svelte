<script>
	import TitleBar from '$components/TitleBar.svelte';
	import Wrapper from '$components/Wrapper.svelte';
	import { formatDate } from '$utils/formatDate';

	export let data;
	console.log('DATA', data);
</script>

<TitleBar title={data.meta.title} />

<Wrapper contentStyle="md:w-4/6">
	<div class="grid grid-cols-2 gap-8 w-full">
    <article>
      <div class="dynamic-content">
        <svelte:component this={data.content} />
      </div>
    </article>
    <div>
      <img src={data.meta.image} alt="project image" class="grayscale" />
      <div class="mt-6 flex flex-col gap-4">
        {#if data.meta.url}
          <a class="underline hover:decoration-primaryBlue hover:decoration-2" target="_blank" href={data.meta.url}>Project</a>
        {/if}
        {#if data.meta.repoUrl}
          <a class="underline hover:decoration-primaryBlue hover:decoration-2" target="_blank" href={data.meta.repoUrl}>Repository</a>
        {/if}
      </div>
    </div>
	</div>
</Wrapper>
