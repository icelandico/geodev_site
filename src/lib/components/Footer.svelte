<script>
	import Bluesky from './icons/bluesky.svelte';
	import Github from './icons/github.svelte';
	import Kofi from './icons/kofi.svelte';
	import Mail from './icons/mail.svelte';
	import Mastodon from './icons/mastodon.svelte';
</script>

<footer class="flex flex-col px-4 pt-8 pb-24 md:pb-8 mt-auto">
	<div class="flex justify-center items-center gap-8">
		<a href="https://github.com/icelandico" target="_blank" aria-label="Github">
			<Github />
		</a>
		<a href="https://fosstodon.org/@muszynov" target="_blank" aria-label="Mastodon">
			<Mastodon />
		</a>
		<a href="https://bsky.app/profile/muszynov.bsky.social" target="_blank" aria-label="Bluesky">
			<Bluesky />
		</a>
		<a href="https://ko-fi.com/geodev" target="_blank" aria-label="Kofi">
			<Kofi />
		</a>
		<a
			class="dark:text-white text-primaryBlack"
			href="https://www.geodev.me/rss.xml"
			aria-label="RSS feed">RSS</a
		>
	</div>
	<a
		href="mailto:hi@geodev.me"
		class="flex justify-center items-center gap-2 mt-4 dark:text-white text-primaryBlack"
		aria-label="mail"
	>
		<Mail />
		hi@geodev.me
	</a>
	<p class="flex justify-center items-center mt-4">Based in Gdynia, Poland</p>
</footer>
