<script>
	import Github from './icons/github.svelte';
	import Kofi from './icons/kofi.svelte';
	import Mail from './icons/mail.svelte';
	import Mastodon from './icons/mastodon.svelte';
</script>

<footer class="flex flex-col px-4 py-8 mt-auto">
	<div class="flex justify-center items-center gap-8">
		<a href="https://github.com/icelandico" target="_blank">
			<Github />
		</a>
		<a href="https://fosstodon.org/@muszynov" target="_blank">
			<Mastodon />
		</a>
		<a href="https://ko-fi.com/geodev" target="_blank">
			<Kofi />
		</a>
		<a class="dark:text-white text-primaryBlack" href="https://www.geodev.me/rss.xml">RSS</a>
	</div>
	<a
		href="mailto:hi@geodev.me"
		class="flex justify-center items-center gap-2 mt-4 dark:text-white text-primaryBlack"
	>
		<Mail />
		hi@geodev.me
	</a>
</footer>
