<script lang="ts">
	import { page } from '$app/stores';

	export let text: string;
	export let route: string;
	export let styles: string = '';

	$: active = route === $page.url.pathname;
</script>

<a
	class={`flex text-lg px-2 font-semibold z-10 h-full items-center justify-center
	${active ? 'text-white bg-primaryBlue w-full top-0 bottom-0 left-0 rounded' : ''}
	${styles}`}
	href={route}
>
	<span>{text}</span>
</a>
