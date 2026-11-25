<script lang="ts">
	export let contentStyle: string = '';
</script>

<div class={`flex flex-col w-full md:w-10/12 lg:w-5/12 max-lg:px-4 pb-4 mx-auto ${contentStyle}`}>
	<slot />
</div>
