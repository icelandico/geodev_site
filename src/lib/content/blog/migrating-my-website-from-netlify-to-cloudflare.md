---
templateKey: blog-post
title: Migrating my website from Netlify to Cloudflare
slug: Migrating my website from Netlify to Cloudflare
date: 2026-01-11T11:42:00.000+01:00
description: Migrating a website from Netlify to Cloudflare is a straightforward
  process. However, there are some configuration differences that may seem
  confusing. In this post, I'll show you how to troubleshoot certain issues
  after a website migration.
category: Personal
tag:
  - javascript
---
I recently migrated this website. I've been hosting it on Netlify for as long as it's been available. Their pricing plan allowed me to host this website (and several others) for free and have access to several useful features Netlify offers, such as Forms for managing forms even on SSG-type websites.

Unfortunately, in mid-2025, Netlify announced that the current pricing plans were being changed and a credit system was introduced. This change, however, wasn't automatic. Old accounts created before the new plans were introduced could use the current generous pricing plan. However, due to my inadvertence, I irreversibly changed my account settings to the new plan.

And then the problems began. The free plan gives us 300 credits per month. One deploy costs 15 credits. If updates to the website are very infrequent, this limit seems sufficient. But even for my small website, it's not enough. Every blog post or asset (photo) added means a commit to the repository and a deploy on the Netlify side. Of course, I could have changed the settings and deployed manually. However, I have several sites on Netlify, and this seemed inconvenient.

In the third month after switching to a new plan, I used up my quota in the first week. The solution? Pay to upgrade or wait until the end of the month to unlock the available credits. At that point, I decided to migrate this site to Cloudflare. I won't go into detail about the process here; it's well-documented. In this post, I'll just highlight a few of the issues I had and how I resolved them.

### HTTP 504 after entering the website

After migrating my domain and using it for this website, I encountered first problem. The website worked when I navigated to https://geodev.me, but it returned a HTTP 504 when I went to www.geodev.me. The first step should be to check your DNS records. The CNAME record is important in this case. It should look like this:

```text
Name: www
Content: geodev.me // your domain
Proxy status: Proxied
TTL: auto
```

However, the site wasn't redirecting from the "www" address to https://geodev.me.
It turned out I hadn't added an SSL certificate. You can do that from the Cloudflare dashboard.

Select SSL/TLS from the left menu and make sure the "Current encryption mode:" option is set to "Full". This solved my problem.

### Custom 404 page not rendered

This website is built using SvelteKit. Svelte allows you to create a dedicated page after accessing a non-existent path. Whether the user manually enters a non-existent address or a link on the page redirects to an invalid URL, we can display a component to the user. If we don't handle this path, the browser will display the standard Page Not Found screen.

In my project, I simply created the `+error.svelte` component and placed it in `src/routes/`. Below is my component for non-existent paths.

```javascript

<script>
	import Wrapper from '$components/Wrapper.svelte';
</script>

<Wrapper>
	<h1 class="text-5xl text-primaryBlack dark:text-white text-center w-full">
		404 - Page not found
	</h1>
</Wrapper>
```

After deploying the site to Cloudflare, it turned out that the component wasn't displayed when navigating to a non-existent address. Instead of the above component, the browser displayed the default **Page Not Found**.

In this case, you should check the settings in the `wrangler.toml` file, which is the Cloudflare configuration file.

```toml
[assets]
directory = "./build"
not_found_handling = "single-page-application" // check if this option is set
html_handling = "auto-trailing-slash"
```

Here's how cloudflare works in this scenario. The `[assets]` configuration serves files directly from the `./build` folder. By default, if a requested file doesn't exist, Cloudflare returns its own 404 page. That means the SvelteKit app never runs, so your `+error.svelte` never gets a chance to render.

If the option is set to `single-page-application` then Cloudflare tries to serve the requested file from `./build`. If the file does not exist, instead of returning 404, it serves your `index.html` fallback. SvelteKit client-side route runs in the browser. If the route is unknown SvelteKit displays your custom `+error.svelte` page.

### Decap CMS

For many years, I've been using a simple CMS called Decap, formerly known as Netlify CMS. It was a product created in Netlify, and authorization to our CMS was handled using the Netlify Identity service. Adding this CMS to the project and configuring authorization was very simple. However, after migrating to Cloudflare, I had to find another way to solve this problem. The CMS authors came to the rescue. They released the <a href="https://decapbridge.com/" target="_blank">decapbridge</a> tool, which allows us to easily add another authorization method to our content management application. 

Simply create a token in GitHub and use the generated config in our config.yml file. From the DecapBridge panel, you can also add other users to whom you want to grant access to your CMS (e.g., a client for whom you developed an application).
