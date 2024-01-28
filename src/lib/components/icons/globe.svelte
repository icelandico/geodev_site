<script>
	export let width = 24;
	export let stroke = '#000';
	export let strokeWidth = 1;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 24 24`}
	{width}
	height={width}
	fill="none"
	{stroke}
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	class="stroke-primaryBlue dark:stroke-white"
	><circle cx="12" cy="12" r="10" /><path
		d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
	/></svg
>
