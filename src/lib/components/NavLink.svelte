<script lang="ts">
	import { page } from '$app/stores';

	export let text: string;
	export let route: string;
	export let styles: string = '';

	$: active = route === $page.url.pathname;
</script>

<a
	class={`relative text-primaryBlack dark:text-white text-xl font-semibold hover:dark:text-secondaryBlue ${
		active
			? 'text-primaryBlue after:absolute after:border-b-4 after:border-b-primaryBlue after:dark:border-b-secondaryBlue after:right-0 after:left-0 after:-bottom-2'
			: ''
	} ${styles}`}
	href={route}
>
	{text}
</a>
