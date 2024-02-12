<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/aleo';
	import NavLink from '$components/NavLink.svelte';
	import NavLinklMobile from '$components/NavLinklMobile.svelte';
	import Footer from '$components/Footer.svelte';
	import DarkmodeIcon from '$components/DarkmodeIcon.svelte';
	import { page } from '$app/stores';

	const DEFAULT_DESCRIPTION = 'Programming and Cartography';
</script>

<svelte:head>
	<title>{$page.data.title || DEFAULT_DESCRIPTION}</title>
	<meta name="description" content={$page.data.description || DEFAULT_DESCRIPTION} />
	<meta name="og:title" content={$page.data.title || DEFAULT_DESCRIPTION} />
	<meta name="og:description" content={$page.data.description || DEFAULT_DESCRIPTION} />
	<meta name="og:type" content="website" />
	<meta name="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={$page.data.title} />
	<meta name="twitter:image" content="https://geodev.me/assets/main_icon.png" />
	<meta name="twitter:description" content={$page.data.description || DEFAULT_DESCRIPTION} />
</svelte:head>

<div class="flex flex-col min-h-screen dark:bg-primaryDark">
	<header>
		<nav class="hidden md:block">
			<div class="flex flex-wrap items-center gap-4 px-6 h-16">
				<NavLink text="home" route="/" />
				<NavLink text="projects" route="/projects" />
				<NavLink text="writing" route="/blog" />
				<NavLink text="reading" route="/books" />
				<DarkmodeIcon styles="ml-auto fixed right-6" />
			</div>
		</nav>

		<nav class="md:hidden fixed inset-x-0 bottom-0 z-20 mx-4 mb-4 flex justify-center h-14">
			<div class="flex items-center justify-center px-2 py-1 bg-secondaryBlack w-full">
				<NavLinklMobile text="home" route="/" />
				<NavLinklMobile text="projects" route="/projects" />
				<NavLinklMobile text="writing" route="/blog" />
				<NavLinklMobile text="reading" route="/books" />
				<DarkmodeIcon styles="ml-4" />
			</div>
		</nav>
	</header>

	<main class="mt-4">
		<slot />
	</main>
	<Footer />
</div>
