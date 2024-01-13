<script>
	import '../app.css';
	import '@fontsource-variable/aleo';
	import NavLink from '$components/NavLink.svelte';
</script>

<header>
	<nav>
		<div class="flex items-center gap-4 px-6 h-16">
			<NavLink text="home" route="/" />
			<NavLink text="works" route="/works" />
			<NavLink text="writing" route="/blog" />
			<NavLink text="reading" route="/books" />
			<NavLink text="about" route="/about" styles="ml-auto" />
		</div>
	</nav>
</header>

<main class="mt-16">
	<slot />
</main>
