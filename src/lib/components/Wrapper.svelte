<script lang="ts">
	export let contentStyle: string = '';
</script>

<div class="flex justify-center">
	<div class={`flex w-3/6 pt-8 ${contentStyle}`}>
		<slot />
	</div>
</div>
