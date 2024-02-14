<script>
	import { PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID } from '$env/static/public';
	import { page } from '$app/stores';
	console.log('env google', PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID);
	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID, {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<script
		async
		src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}`}
	>
	</script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID);
	</script>
</svelte:head>
