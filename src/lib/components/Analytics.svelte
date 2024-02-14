<script>
	import { PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID } from '$env/static/public';
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
