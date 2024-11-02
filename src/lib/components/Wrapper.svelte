<script lang="ts">
	export let contentStyle: string = '';
</script>

<div class={`flex w-full md:w-10/12 lg:w-5/12 max-F<lg:px-4 pb-4 ${contentStyle}`}>
	<slot />
</div>
