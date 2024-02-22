---
templateKey: blog-post
title: My website version 2.0
slug: my website version 2
date: 2024-02-22T12:44:26.928Z
category: Personal
tag:
  - various
---
My previous website, built with Gatsby, served me well for a few years. It was performant, SEO-friendly and had a design I liked. I wanted to build and finish a new project and I decided that creating my website from scratch will be a good idea. My main point was to focus on starting and finishing a project and to learn a new technology.  
## Based on SvelteKit

SvelteKit, a framework for building web applications, caught my attention with its unique approach to building user interfaces. Unlike traditional frameworks that do the bulk of their work in the browser, Svelte shifts that work into a compile step, producing highly optimized vanilla JavaScript. This results in faster page loads and a more responsive user experience. Additionally, SvelteKit's file-based routing and server-side rendering capabilities promised a seamless development experience and improved SEO, making it an attractive choice for my website. I've done some tiny projects in Svelte before but I just scratched the surface of the Svelte's possibilities.
## Styling with Tailwind

Complementing SvelteKit, I've chosen Tailwind CSS for styling my website. Tailwind's utility-first approach was a significant departure from the css preprocessor (SCSS)  I was accustomed to. It allowed me to build custom designs with speed and efficiency, without leaving the HTML. This not only sped up the development process but also encouraged a more consistent design system. The more I used Tailwind, the more I appreciated the flexibility and control it offered, enabling me to bring my design vision to life with unprecedented ease. 

My new website is the first project in which I used Tailwind. You can find a lot of negative opinions about this approach to styling. However I like this approach. Of course, it's another piece of technology to learn. Writing styles with Tailwind has made it necessary to pay more attention to creating reusable components to avoid repeating style declarations. That's a good thing for me. Also - I like the theming approach. My website has two themes (light and dark) and creating a solution to switch the theme was much easier than the one I used before with css variables.
## Rendering content from markdown files

All of my content is stored in markdown files. I needed a way to get the content from these files and display the data in the markup. To achieve this in Svelte project I use <a href="https://mdsvex.pngwn.io/" target="_blank" aria-label="library mdsvex">mdsvex library</a>. Comparing to Gatsby plugin which I used before, this solution is a bit cleaner. I found it easier to setup and work with <a href="https://mdsvex.pngwn.io/">mdsvex</a> than with a Gatsby and graphql.
## Content management system 

Nothing has changed when it comes to CMS. I have used <a href="https://decapcms.org/" target="_blank">Decap CMS  (formerly known as netlify-cms)</a> since the beginning of my site. It's very easy to setup, platform agnostic and extensible. 

## Conclusion?

I feel that I had created a much simpler website with a cleaner design than the previous one. What's the most important - I had a lot of fun doing it.
The only thing this site lacks is more traffic and any kind of response from users.  I would like to focus this year on solving this problem.
