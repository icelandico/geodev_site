  <script>
  	import theme from '$lib/store/theme';
	$: themeVariant = $theme === 'light' ? 'boxy-light' : 'gruvbox-dark';
  </script>

<section class="my-12">
    <h3 class="mb-2 text-xl md:text-2xl dark:text-white">Comments</h3>
    <script src="https://utteranc.es/client.js"
        repo="icelandico/geodev_site"
        issue-term="pathname"
        theme={themeVariant}
        crossorigin="anonymous"
        async>
    </script>
</section>