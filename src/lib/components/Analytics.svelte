<script lang="ts">
	import { PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID } from '$env/static/public';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const loadGoogleAnalytics = () => {
		const script = document.createElement('script');
		script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}`;
		script.async = true;
		
		script.onload = () => {
			window.dataLayer = window.dataLayer || [];
			window.gtag = function gtag(): void {
					window.dataLayer.push(arguments);
			};
			window.gtag('js', new Date());
			window.gtag('config', PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID);
		};

		document.head.appendChild(script);
	};

	onMount(() => {
		if (browser) {
			if ('requestIdleCallback' in window) {
					window.requestIdleCallback(() => loadGoogleAnalytics());
			} else {
					setTimeout(loadGoogleAnalytics, 3000);
			}
		}
	});
</script>