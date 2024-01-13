<script lang="ts">
  import { page } from "$app/stores";

  export let text: string;
  export let route: string;
  export let styles: string = '';
  
  $: active = route === $page.url.pathname;
</script>

<a class={`text-xl font-semibold ${active ? 'text-primaryBlue' : ''} ${styles}`} href={route}>{text}</a>