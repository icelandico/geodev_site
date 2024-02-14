<script lang="ts">
	export let contentStyle: string = '';
</script>

<div class="flex justify-center pb-2">
	<div class={`flex w-full md:w-5/12 max-md:px-4 pb-4 ${contentStyle}`}>
		<slot />
	</div>
</div>
