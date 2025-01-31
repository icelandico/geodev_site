---
templateKey: blog-post
title: Creating RSS Feed from multiple content types in Svelte
slug: svelte rss feed multiple content
date: 2025-01-31T20:05:00.000Z
category: JavaScript
tag:
  - svelte
  - basics
---

RSS is not dead. I think so. Most of blogs I regularly read have RSS feed. I can find topic related to RSS on other sources I visit, like Hacker News, <a href="https://www.reddit.com/r/rss/" target="_blank">rss subreddit</a> and other web development related communities. I can still find new articles on how to implement RSS feed on your own website. This makes me feel that people still use it. So do I. I encourage you to add my feed to your list, <a href="https://www.geodev.me/rss.xml" target="_blank">you're welcome</a>.

In this post I would like to show how you can create one and what to do if you want to aggregate data from multiple pages. My website is created using Svelte, so my example would be in this particular environment. Also, I want to show how to merge a few data sources into one rss feed. 

## The most popular example

In most blog scenarios RSS feed will consist of blog posts only. This is very straightforward example of how you can implement it. This is not the exact snippet from my website.
```javascript
import * as posts from '$lib/posts';
export const prerender = true;

export async function GET() {
  const headers = {
    'Content-Type': 'application/xml',
    'Cache-Control': 'max-age=0, s-maxage=3600'
  };

  const allPosts = await posts.getAllPosts();
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const xml = `
  <?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
	    <title>Your Blog Name</title>
	    <description>Your blog description here</description>
	    <link>https://yourblog.com</link>
	    <atom:link href="https://yourblog.com/rss.xml" rel="self" type="application/rss+xml"/>
	    <language>en</language>
	    ${sortedPosts
	      .map(
	        (post) => `
	      <item>
	        <title>${post.title}</title>
	        <link>https://yourblog.com/posts/${post.slug}</link>
	        <guid>https://yourblog.com/posts/${post.slug}</guid>
	        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
	        <author>${post.author}</author>
	      </item>
	    `
      )
      .join('')}
    </channel>
	</rss>`;

  return new Response(xml, { headers });
}
```

If you put this file named `+server.ts` in `rss.xml` folder in your directory this will result in an XML file being created during the application building process with the values ​​specified in this file. The XML will be available at:  `https://yourwebsite.com/rss.xml`.

## Adding data sources

The previous example was simple and for most of the users there's no need for extending this solution. However, there may be a need to display elements from a source other than e.g. blog posts. On my website, in addition to blog entries, I wanted my short notes about the books I've read (available in the **reading** section) to also appear in RSS feed. In this case we need to bring the data from both sources into a common format so that we can easily handle filling the XML with data. I will show this with an example from my site. 
First, let's compare the interfaces of both data - books and posts.
```javascript
export interface Book {
	templateKey: string;
	title: string;
	author: string;
	slug: string;
	date: string;
	link: string;
	rating: string;
	pages: number;
	genre: string[];
	polishOnly: boolean;
}

export interface PostData {
	metadata: Post;
	default: unknown;
};

export interface Post {
	templateKey: string;
	title: string;
	slug: string;
	date: string;
	category: string;
	tag: string[];
}
```

Looking at both interfaces we can find common elements:
- title
- date
- templateKey
- slug

I didn't need more data so I used these four keys to use them in my XML. Here's my approach:
```javascript
import { posts } from '$lib/server/blogPosts';
import { books } from '$lib/server/books';
import { PAGE_DESCRIPTION } from '$utils/constants';

type RSSContent = { title: string; date: string; slug: string; templateKey: string };

const siteURL = 'https://www.geodev.me';
const siteTitle = 'Michal Muszynski | RSS Feed';
const siteDescription = PAGE_DESCRIPTION;

export const prerender = true;

export const GET = async () => {
	const allPosts = await posts;
	const allBooks = await books;

	const content = [...allPosts, ...allBooks].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	const body = render(content as RSSContent[]);
	const options = {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	};

	return new Response(body, options);
};

const render = (content: RSSContent[]) =>
	`<?xml version="1.0" encoding="UTF-8" ?>
		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
		<channel>
			<title>${siteTitle}</title>
			<author>
      	<name>Michal Muszynski</name>
    	</author>
			<description>${siteDescription}</description>
			<link>${siteURL}</link>
			<atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
			${content
				.map(
					(entry) =>
						`<item>
							<guid isPermaLink="true">${siteURL}/${entry.templateKey === 'blog-post' ? 'blog' : 'books'}/${
								entry.slug
							}</guid>
							<title>${entry.title}</title>
							<link>${siteURL}/${entry.templateKey === 'blog-post' ? 'blog' : 'books'}/${entry.slug}</link>
							<description>${entry.title}</description>
							<pubDate>${new Date(entry.date).toUTCString()}</pubDate>
					</item>`
				)
				.join('')}
		</channel>
	</rss>
`;
```

Let's break down this simple code:
- It imports blog posts and books data, likely from a database or file system
- Sets up basic site information (URL, title, description)
- The `GET` function:
    - Combines and sorts both blog posts and books by date
    - Generates XML content using the `render` function
    - Returns the XML with proper headers for RSS consumption
- The `render` function creates the actual RSS XML structure:
    - Includes channel metadata (title, author, description)
    - Maps through all content items (posts and books)
    - For each item, creates an entry with:
        - A unique URL (guid)
        - Title
        - Link
        - Description
        - Publication date
          
Note that I use `templateKey` which comes from the Decap CMS. That's the unique key I add to every type of content I configured on my website. Of course it's not a Decap CMS unique feature. It's much easier If we have a clear way to distinguish the type of content.
