<script>
	import '../app.css';
	import '@fontsource-variable/aleo';
	import NavLink from '$components/NavLink.svelte';
	import NavLinklMobile from '$components/NavLinklMobile.svelte';
	import Footer from '$components/Footer.svelte';
	import DarkmodeIcon from '$components/DarkmodeIcon.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<header>
		<nav class="hidden md:block">
			<div class="flex flex-wrap items-center gap-4 px-6 h-16">
				<NavLink text="home" route="/" />
				<NavLink text="projects" route="/projects" />
				<NavLink text="writing" route="/blog" />
				<NavLink text="reading" route="/books" />
				<DarkmodeIcon styles="ml-auto" />
				<!-- <NavLink text="about" route="/about" styles="ml-auto" /> -->
			</div>
		</nav>

		<nav class="md:hidden fixed inset-x-0 bottom-0 z-20 mx-auto mb-4 flex h-14 px-2">
			<div class="flex items-center gap-4">
				<NavLinklMobile text="home" route="/" />
				<NavLinklMobile text="projects" route="/projects" />
				<NavLinklMobile text="writing" route="/blog" />
				<NavLinklMobile text="reading" route="/books" />
				<NavLinklMobile text="about" route="/about" />
			</div>
		</nav>
	</header>

	<main class="mt-12">
		<slot />
	</main>
	<Footer />
</div>
