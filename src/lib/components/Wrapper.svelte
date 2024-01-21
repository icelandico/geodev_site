<script lang="ts">
	export let contentStyle: string = '';
</script>

<div class="flex justify-center pb-20">
	<div class={`flex w-full md:w-3/6 max-md:px-4 pt-4 ${contentStyle}`}>
		<slot />
	</div>
</div>
