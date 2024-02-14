<script lang="ts">
	import { PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID } from '$env/static/public';
	import { browser } from '$app/environment';

	if (browser) {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag(): void {
			window.dataLayer.push(arguments);
		};
		window.gtag('js', new Date());
		window.gtag('config', PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID);
	}
</script>

<svelte:head>
	<script
		async
		src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}"
	></script>
</svelte:head>
