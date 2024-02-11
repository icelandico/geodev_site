<script>
	import '../app.css';
	import '@fontsource-variable/aleo';
	import NavLink from '$components/NavLink.svelte';
	import NavLinklMobile from '$components/NavLinklMobile.svelte';
	import Footer from '$components/Footer.svelte';
	import DarkmodeIcon from '$components/DarkmodeIcon.svelte';
</script>

<div class="flex flex-col min-h-screen dark:bg-primaryDark">
	<header>
		<nav class="hidden md:block">
			<div class="flex flex-wrap items-center gap-4 px-6 h-16">
				<NavLink text="home" route="/" />
				<NavLink text="projects" route="/projects" />
				<NavLink text="writing" route="/blog" />
				<NavLink text="reading" route="/books" />
				<DarkmodeIcon styles="ml-auto" />
			</div>
		</nav>

		<nav class="md:hidden fixed inset-x-0 bottom-0 z-20 mx-4 mb-4 flex justify-center h-14">
			<div class="flex items-center justify-center px-2 py-1 border-2 bg-secondaryBlack w-full">
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
