<script>
  import "../app.css";
  import "@fontsource/overpass";
  import NavLink from '$components/NavLink.svelte';
</script>

<header>
  <nav>
    <div class="flex items-center gap-4 px-6 h-16">
      <NavLink text='home' route='/' />
      <NavLink text='works' route='/works' />
      <NavLink text='writing' route='/blog' />
      <NavLink text='reading' route='/reading' />
      <NavLink text='about' route='/about' styles='ml-auto' />
    </div>
  </nav>
</header>

<slot />