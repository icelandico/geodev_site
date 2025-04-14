import { getExcerpt } from '$utils/getExcerpt';
import { error } from '@sveltejs/kit';
import matter from 'gray-matter';

export async function load({ params }) {
	const slug = params.slug;
	const book = await import(`../../../lib/content/books/${slug}.md`);

	const files = import.meta.glob('/src/lib/content/books/*.md', {
		as: 'raw',
		eager: true
	});

	const match = Object.entries(files).find(([path]) =>
		path.endsWith(`${slug}.md`)
	);
	if (!match) {
		throw error(404, `Book not found: ${slug}`);
	}

	const [_, rawMarkdown] = match;
	const { data: metadata, content } = matter(rawMarkdown);

	return {
		title: metadata.title,
		genre: metadata.genre,
		content: book.default,
		description: getExcerpt(content),
		meta: metadata
	};
}

