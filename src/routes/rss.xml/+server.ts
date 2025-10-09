import { posts } from '$lib/server/blogPosts';
import { books } from '$lib/server/books';
import { projects } from '$lib/server/projects';
import { PAGE_DESCRIPTION } from '$utils/constants';

type RSSContent = {
	title: string;
	date: string;
	slug: string;
	templateKey: string;
	author: string;
	content?: string;
	description?: string;
};

const siteURL = 'https://www.geodev.me';
const siteTitle = 'Michal Muszynski | RSS Feed';
const siteDescription = PAGE_DESCRIPTION;

export const prerender = true;

export const GET = async () => {
	const allPosts = await posts;
	const allBooks = await books;
	const allProjects = await projects;

	const content = [...allPosts, ...allBooks, ...allProjects].sort(
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

const getTitle = (entry: RSSContent) => {
	const { templateKey, title, author } = entry;
	if (templateKey === 'blog-post') {
		return title;
	}
	if (templateKey === 'book-item') {
		return `Book note: ${title}, by ${author}`;
	}

	if (templateKey === 'work-item') {
		return `Project: ${title}`;
	}
};

const getExcerpt = (type: string, entry: RSSContent, length: number = 200) => {
	if (type === 'work-item') return entry.description;
	if (!entry.content || type === 'blog-post') return '';

	if (entry.content) {
		const cleanContent = entry.content.trim().replace(/\s+/g, ' ').trim();
		return cleanContent.length > length ? cleanContent.slice(0, length) + '...' : cleanContent;
	}
};

const getSlug = (key: string) => {
	switch (key) {
		case 'blog-post':
			return 'blog';
		case 'book-item':
			return 'books';
		case 'work-item':
			return 'projects';
		default:
			return '';
	}
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
							<guid isPermaLink="true">${siteURL}/${getSlug(entry.templateKey)}/${entry.slug}</guid>
							<title>${getTitle(entry)}</title>
							<link>${siteURL}/${getSlug(entry.templateKey)}/${entry.slug}</link>
							<description>${getExcerpt(entry.templateKey, entry)}</description>
							<pubDate>${new Date(entry.date).toUTCString()}</pubDate>
					</item>`
				)
				.join('')}
		</channel>
	</rss>
`;
