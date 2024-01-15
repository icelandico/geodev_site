<script>
	export let data;

	console.log('POST', data);
</script>

<h1>{data.meta.title}</h1>
<div class="w-2/5 m-auto">
	<article>
		<div class="dynamic-content">
			<svelte:component this={data.content} />
		</div>
	</article>
</div>
